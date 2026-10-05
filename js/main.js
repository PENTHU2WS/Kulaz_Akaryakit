// ==========================================
// KULAZ AKARYAKIT NAKLİYE - MAIN JS CONTROLLER
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });

  // Floating WhatsApp Widget Toggle
  const toggleWaBtn = document.getElementById('toggleWhatsappBtn');
  const closeWaBtn = document.getElementById('closeWhatsappBtn');
  const waChatBox = document.getElementById('whatsappChatBox');

  if (toggleWaBtn && waChatBox) {
    toggleWaBtn.addEventListener('click', () => {
      waChatBox.classList.toggle('open');
    });
  }

  if (closeWaBtn && waChatBox) {
    closeWaBtn.addEventListener('click', () => {
      waChatBox.classList.remove('open');
    });
  }

  // Quote Form Handler (Sends via WhatsApp / Form Onay)
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const fuelType = document.getElementById('fuelType').value;
      const route = document.getElementById('route').value.trim();
      const message = document.getElementById('message').value.trim();

      // Format WhatsApp Message
      const waText = `*KULAZ AKARYAKIT TEKLİF TALEBİ*%0A` +
        `👤 *Müşteri:* ${encodeURIComponent(fullName)}%0A` +
        `📞 *Telefon:* ${encodeURIComponent(phone)}%0A` +
        `⛽ *Ürün Türü:* ${encodeURIComponent(fuelType)}%0A` +
        `📍 *Güzergah:* ${encodeURIComponent(route || 'Belirtilmedi')}%0A` +
        `📝 *Detay:* ${encodeURIComponent(message || 'Yok')}`;

      // Open WhatsApp direct link
      const waUrl = `https://wa.me/905326523899?text=${waText}`;
      
      // Alert & Redirect
      alert('Teklif talebiniz hazırlandı! Şimdi WhatsApp hattımıza aktarılıyorsunuz...');
      window.open(waUrl, '_blank');

      quoteForm.reset();
    });
  }
});
