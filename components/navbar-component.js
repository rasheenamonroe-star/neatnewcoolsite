export default {
  name: 'navbar-component',
  template: /* html */ `
    <nav class="navbar sticky-top bg-white border-bottom px-5">
      <router-link class="navbar-brand mb-0 h1 d-flex align-items-center navbar-logo-link" to="/">
        <img src="./assets/Art%20for%20webapp/1.png" alt="Logo" class="me-2 navbar-logo-image" />
        The Lost Galleries
      </router-link>

      <div class="ms-auto d-flex gap-2">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-house me-1"></i>Home
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
          <i class="bi bi-images me-1"></i>Sketches
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About This Webapp
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about-creator">
          <i class="bi bi-person me-1"></i>About The Creator
        </router-link>
      </div>
    </nav>
  `,
};
