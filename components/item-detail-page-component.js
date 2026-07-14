export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    return {
      itemsStore,
      selectedItem,
    };
  },
  template: /* html */ `
    <section class="item-detail-page position-relative">
      <div class="sketty-overlay"></div>
      <router-link to="/items" class="btn btn-link ps-0 mb-3 text-white">← Back to collection</router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>

      <div v-else class="item-detail-view">
        <img
          v-if="selectedItem.imageUrl"
          :src="selectedItem.detailImageUrl || selectedItem.imageUrl"
          :alt="selectedItem.name"
          class="item-detail-image" />
        <div
          v-else
          class="item-detail-image d-flex align-items-center justify-content-center bg-light text-muted">
          No image available
        </div>

        <div class="item-detail-info">
          <div class="d-flex align-items-center gap-2 mb-2">
            <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
            <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
          </div>

          <p class="lead mb-3">{{ selectedItem.description || 'No description available.' }}</p>
          <p class="mb-0"><strong>Dates:</strong> {{ selectedItem.dates || 'N/A' }}</p>
          <p class="text-muted mt-2 mb-0"><strong>Item ID:</strong> {{ selectedItem.id }}</p>
        </div>
      </div>
    </section>
  `,
};
