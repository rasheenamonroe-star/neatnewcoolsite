export default {
  name: 'collection-page-component',
  props: {
    isSketchesPage: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const itemsStore = Vue.inject('itemsStore');

    return {
      itemsStore,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h500 mb-0">Collection</h1>
        <span class="badge text-bg-light border">{{ itemsStore.items.length }} shown</span>
      </div>

      <p class="text-white">Browse a vast collection of discovered art pieces.</p>
      <p class="text-white">NOTE: Keep in mind that the info provided for each piece may not be completely accurate. The info below is purely speculative.</p>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading items...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="itemsStore.items.length === 0" class="alert alert-warning" role="alert">
        No items found in the dataset.
      </div>

      <div v-else :class="isSketchesPage ? 'gallery-image' : 'row g-3'">
        <div
          :class="isSketchesPage ? 'img-box' : 'col-12 col-md-6 col-lg-4'"
          v-for="item in itemsStore.items"
          :key="item.id"
        >
          <article
            :class="isSketchesPage ? 'card h-100 shadow-sm border-0' : 'card h-100 shadow-sm border-0'"
          >
            <router-link v-if="item.imageUrl" :to="'/items/' + item.id" class="d-block">
              <img
                :src="item.detailImageUrl || item.imageUrl"
                :alt="item.name"
                :class="isSketchesPage ? '' : 'card-img-top collection-card-image'"
              />
              <div v-if="isSketchesPage" class="transparent-box">
                <div class="caption">
                  <p>{{ item.name }}</p>
                  <p class="opacity-low">{{ item.description || 'No description available.' }}</p>
                </div>
              </div>
            </router-link>

            <div
              v-else
              class="collection-card-image d-flex align-items-center justify-content-center bg-light text-muted"
            >
              No image available
            </div>

            <div
              v-if="!isSketchesPage"
              class="card-body d-flex flex-column align-items-center text-center"
            >
              <h2 class="h5 card-title mb-2">{{ item.name }}</h2>

              <p class="card-text text-muted flex-grow-1 collection-description">
                {{ item.description || 'No description available.' }}
              </p>

              <p class="small mb-3"><strong>Dates:</strong> {{ item.dates || 'N/A' }}</p>

              <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary btn-sm">
                View details
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
