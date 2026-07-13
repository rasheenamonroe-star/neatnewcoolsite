import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import AboutCopyPageComponent from './components/about-copy-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/about-creator',
    component: AboutCopyPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
    });

    // Resolve image path for collection thumbnails.
    const resolveImageUrl = async (value) => {
      const imageUrl = String(value || '').trim();
      if (!imageUrl) return '';

      const candidates = [];
      // if absolute or protocol-based, return as-is
      const hasProtocol = /^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:');
      const isRootRelative = imageUrl.startsWith('/');
      if (hasProtocol || isRootRelative) return imageUrl;

      // If the CSV already points to an assets path, use it directly
      if (imageUrl.startsWith('assets/') || imageUrl.startsWith('./')) candidates.push(imageUrl);

      // common local paths to try
      candidates.push(`assets/${imageUrl}`);
      candidates.push(`assets/Art for webapp/${imageUrl}`);

      // Try each candidate with a HEAD request and return the first that exists
      for (const p of candidates) {
        try {
          // HEAD is lightweight; some servers may not support it, so fall back to GET
          const resp = await fetch(p, { method: 'HEAD' });
          if (resp && resp.ok) return p;
        } catch (e) {
          try {
            const resp2 = await fetch(p, { method: 'GET' });
            if (resp2 && resp2.ok) return p;
          } catch (e2) {
            // ignore and continue
          }
        }
      }

      // last resort: return the most likely path
      return `assets/${imageUrl}`;
    };

    // Resolve the larger detail-page image from the new lostgalleriesentries folder.
    const resolveDetailImageUrl = async (value) => {
      const imageUrl = String(value || '').trim();
      if (!imageUrl) return '';

      const hasProtocol = /^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith('data:');
      const isRootRelative = imageUrl.startsWith('/');
      if (hasProtocol || isRootRelative) return imageUrl;

      const fileName = imageUrl.split('/').pop() || imageUrl;
      const baseName = fileName.replace(/\.[^.]+$/, '');
      const candidates = [];

      candidates.push(`assets/Art for webapp/lostgalleriesentries/${baseName}.png`);
      candidates.push(`assets/Art for webapp/lostgalleriesentries/${fileName}`);

      for (const p of candidates) {
        try {
          const resp = await fetch(p, { method: 'HEAD' });
          if (resp && resp.ok) return p;
        } catch (e) {
          try {
            const resp2 = await fetch(p, { method: 'GET' });
            if (resp2 && resp2.ok) return p;
          } catch (e2) {
            // ignore and continue
          }
        }
      }

      return imageUrl;
    };

    // Load the local CSV file `items.csv` which references images in the `assets/` folder.
    // If it is not available, fall back to `items-template.csv` so the app still works.
    const loadCsv = async () => {
      try {
        let resp = await fetch('items.csv');
        if (!resp.ok) {
          // try fallback template
          resp = await fetch('items-template.csv');
        }
        if (!resp.ok) throw new Error('Could not load CSV data file.');
        const csvText = await resp.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: async ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
              itemsStore.isLoading = false;
              return;
            }

            // Resolve image URLs asynchronously for each row
            const resolved = await Promise.all(
              data.map(async (row) => {
                const rawImage = row.image_url || row.imageUrl || row.image || '';
                const imageUrl = await resolveImageUrl(rawImage);
                const detailImageUrl = await resolveDetailImageUrl(rawImage);
                return {
                  id: String(row.id || '').trim(),
                  name: String(row.name || '').trim(),
                  description: String(row.description || '').trim(),
                  category: String(row.category || '').trim(),
                  imageUrl,
                  detailImageUrl,
                  // Use `dates` from the CSV; fall back to `date` or `location` if present
                  dates: String(row.dates || row.date || row.location || '').trim(),
                };
              })
            );

            itemsStore.items = resolved;
            itemsStore.error = '';
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      } catch (e) {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      }
    };

    loadCsv();

    Vue.provide('itemsStore', itemsStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
