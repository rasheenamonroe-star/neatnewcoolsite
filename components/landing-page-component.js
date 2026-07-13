export default {
  name: 'landing-page-component',
  template: /* html */ `
  
    <div class="landing-page-shell">
      <div class="landing-page-overlay" aria-hidden="true"></div>
      <div class="container py-4 landing-page-content">
        <h1 class="mb-3">✨ Sketch Gallery</h1>
        <div class="homepage-action-buttons mb-4">
          <router-link to="/items" class="btn btn-primary"><i class="bi bi-images me-1"></i>Browse Sketches</router-link>
          <div class="homepage-intro-copy">
            <p class="lead mb-0">Discover beautiful sketches and art found in unexpected places around town.</p>
          </div>
          <router-link to="/about" class="btn btn-primary"><i class="bi bi-info-circle me-1"></i>About This Webapp</router-link>
        </div>

        <h2 class="h4 mt-3">About This Gallery</h2>
        <p style="max-width: 600px;">
          This website is dedicated to the lost and found. Each of the sketches displayed in this gallery present a glimpse into an era of an artist. This website was inspired by a collection of sketchbooks I aqquired from my aunt. I felt the best way to show these discovered art pieces was with a dedicated website. 
        </p>
        <p style="max-width: 610px;">
          Explore the collection to see sketches and illustrations of all kinds—from detailed portraits and landscapes to abstract designs and playful characters. Each piece is a window into someone's creative moment.
        </p>
      </div>
    </div>
  `,
};

