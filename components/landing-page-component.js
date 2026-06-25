export default {
  name: 'landing-page-component',
  template: /* html */ `
    <div class="container py-4">
      <h1 class="mb-3">✨ Sketch Gallery</h1>
      <p class="lead">Discover beautiful sketches and art found in unexpected places around town.</p>
      <router-link to="/items" class="btn btn-primary mb-4"><i class="bi bi-images me-1"></i>Browse Sketches</router-link>

      <h2 class="h4 mt-3">About This Gallery</h2>
      <p>
        Have you ever found an amazing sketch or drawing somewhere random? Maybe in a thrift store, on a street corner, or at a local park? This gallery collects those wonderful "found art" pieces from around town. Every sketch has a story about where it was discovered and what makes it special.
      </p>
      <p>
        Explore the collection to see sketches and illustrations of all kinds—from detailed portraits and landscapes to abstract designs and playful characters. Each piece is a window into someone's creative moment.
      </p>
    </div>
  `,
};
