// ==========================================
// KULAZ AKARYAKIT NAKLİYE - CMS LOADER
// Automatically applies custom content set in Admin Panel
// ==========================================

(function loadCmsContent() {
  document.addEventListener('DOMContentLoaded', () => {
    const rawData = localStorage.getItem('kulaz_site_cms');
    if (!rawData) return; // Use defaults from index.html if not set

    try {
      const cms = JSON.parse(rawData);

      // --- LOGO ---
      if (cms.logoSrc) {
        document.querySelectorAll('.header-logo-img, .footer-logo-img, #loginLogoPreview').forEach(img => {
          img.src = cms.logoSrc;
        });
      }

      // --- CONTACT INFO ---
      if (cms.phone) {
        const phoneClean = cms.phone.replace(/[^0-9]/g, '');
        document.querySelectorAll('a[href^="tel:"]').forEach(a => {
          a.href = `tel:${phoneClean}`;
          if (a.classList.contains('btn-accent')) {
            a.innerHTML = `<i class="fa-solid fa-phone-flip"></i> Hemen Ara: ${cms.phone}`;
          } else {
            a.innerHTML = `<i class="fa-solid fa-phone"></i> ${cms.phone}`;
          }
        });

        // Update plain text phone in footer/contact
        document.querySelectorAll('.footer-contact p').forEach(p => {
          if (p.innerHTML.includes('fa-phone')) {
            p.innerHTML = `<i class="fa-solid fa-phone"></i> ${cms.phone}`;
          }
        });
      }

      if (cms.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
          a.href = `mailto:${cms.email}`;
          a.innerHTML = `<i class="fa-solid fa-envelope"></i> ${cms.email}`;
        });

        // Update plain text email in footer/contact
        document.querySelectorAll('.footer-contact p').forEach(p => {
          if (p.innerHTML.includes('fa-envelope')) {
            p.innerHTML = `<i class="fa-solid fa-envelope"></i> ${cms.email}`;
          }
        });
      }

      if (cms.address) {
        const addrEl = document.getElementById('cmsAddressText');
        if (addrEl) addrEl.textContent = cms.address;
      }

      // --- HERO SECTION ---
      if (cms.heroBadge) {
        const badge = document.querySelector('.hero-badge');
        if (badge) badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${cms.heroBadge}`;
      }

      if (cms.heroTitle) {
        const title = document.querySelector('.hero-title');
        if (title) title.innerHTML = cms.heroTitle;
      }

      if (cms.heroSubtitle) {
        const sub = document.querySelector('.hero-subtitle');
        if (sub) sub.textContent = cms.heroSubtitle;
      }

      // --- KURUMSAL (ABOUT) SECTION ---
      if (cms.aboutTitle) {
        const title = document.querySelector('#kurumsal .section-title');
        if (title) title.textContent = cms.aboutTitle;
      }

      if (cms.aboutLead) {
        const lead = document.querySelector('#kurumsal .lead-text');
        if (lead) lead.textContent = cms.aboutLead;
      }

      if (cms.aboutBody) {
        const body = document.querySelector('#kurumsal .body-text');
        if (body) body.textContent = cms.aboutBody;
      }

      if (cms.aboutImg) {
        const img = document.querySelector('#kurumsal .about-img');
        if (img) img.src = cms.aboutImg;
      }

      // --- SERVICES ---
      if (cms.service1Title) {
        const s1Title = document.querySelector('.grid-3 .service-card:nth-child(1) h3');
        if (s1Title) s1Title.textContent = cms.service1Title;
      }
      if (cms.service1Desc) {
        const s1Desc = document.querySelector('.grid-3 .service-card:nth-child(1) p');
        if (s1Desc) s1Desc.textContent = cms.service1Desc;
      }

      if (cms.service2Title) {
        const s2Title = document.querySelector('.grid-3 .service-card:nth-child(2) h3');
        if (s2Title) s2Title.textContent = cms.service2Title;
      }
      if (cms.service2Desc) {
        const s2Desc = document.querySelector('.grid-3 .service-card:nth-child(2) p');
        if (s2Desc) s2Desc.textContent = cms.service2Desc;
      }

      if (cms.service3Title) {
        const s3Title = document.querySelector('.grid-3 .service-card:nth-child(3) h3');
        if (s3Title) s3Title.textContent = cms.service3Title;
      }
      if (cms.service3Desc) {
        const s3Desc = document.querySelector('.grid-3 .service-card:nth-child(3) p');
        if (s3Desc) s3Desc.textContent = cms.service3Desc;
      }

    } catch (e) {
      console.error('Error loading CMS content:', e);
    }
  });
})();
