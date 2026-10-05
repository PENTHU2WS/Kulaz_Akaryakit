// ==========================================
// KULAZ AKARYAKIT NAKLİYE - PUBLIC GALLERY JS
// ==========================================

// Global Lightbox Functions
function openLightbox(src, caption) {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightboxModal && lightboxImg) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'Kulaz Akaryakıt Taşıma Görseli';
    lightboxModal.classList.add('active');
  }
}

function closeLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    lightboxModal.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // --- LOCAL STORAGE IMAGE LOADER FOR PUBLIC GALLERY ---
  function getStoredImages() {
    return JSON.parse(localStorage.getItem('kulaz_uploaded_gallery') || '[]');
  }

  function renderUploadedImages() {
    const stored = getStoredImages();
    
    // Remove existing uploaded items before re-rendering
    document.querySelectorAll('.gallery-item[data-uploaded="true"]').forEach(el => el.remove());

    stored.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.setAttribute('data-category', item.category || 'tanker');
      card.setAttribute('data-uploaded', 'true');

      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <div class="gallery-overlay">
          <div class="gallery-info">
            <h4>${item.title}</h4>
            <p>Kulaz Akaryakıt Galeri</p>
          </div>
          <button class="zoom-btn" onclick="openLightbox('${item.src}', '${item.title}')">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </button>
        </div>
      `;

      galleryGrid.prepend(card);
    });
  }

  renderUploadedImages();

  // Listen to storage changes in case admin uploads in another tab
  window.addEventListener('storage', (e) => {
    if (e.key === 'kulaz_uploaded_gallery') {
      renderUploadedImages();
    }
  });

  // --- CATEGORY FILTERING ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const items = document.querySelectorAll('.gallery-item');

      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');

        if (filter === 'all') {
          item.style.display = 'block';
        } else {
          item.style.display = (itemCat === filter) ? 'block' : 'none';
        }
      });
    });
  });
});
