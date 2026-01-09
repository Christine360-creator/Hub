// ==========================
// BASIC PAGE ROTATION
// ==========================
let currentPage = 1;

function showPage(pageNumber) {
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");

    if (!page1 || !page2) return;

    page1.style.display = pageNumber === 1 ? "block" : "none";
    page2.style.display = pageNumber === 2 ? "block" : "none";
}

// Start on page 1
showPage(currentPage);

// Rotate pages safely
setInterval(() => {
    currentPage = currentPage === 1 ? 2 : 1;
    showPage(currentPage);
}, HUB_CONFIG.rotationTime || 60000);

// ==========================
// QUOTES (SAFE)
// ==========================
let quotes = [];
let currentQuoteIndex = 0;

async function loadQuotes() {
    try {
        const response = await fetch("quotes/quotes.json");
        quotes = await response.json();
        showQuote();

        setInterval(showQuote, HUB_CONFIG.quoteRotationTime || 30000);
    } catch (err) {
        console.warn("Quotes not loaded:", err);
    }
}

function showQuote() {
    if (!quotes.length) return;

    const text = quotes[currentQuoteIndex];
    const h1a = document.getElementById("themeHeader");
    const h1b = document.getElementById("themeHeader2");

    if (h1a) h1a.textContent = text;
    if (h1b) h1b.textContent = text;

    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
}

// ==========================
// PHOTOS (SAFE)
// ==========================
let photoIndex = 0;

function rotatePhotos() {
    if (!HUB_CONFIG.photos || HUB_CONFIG.photos.length === 0) return;

    const page1Photo = document.getElementById("page1Photo");
    const page2Photo = document.getElementById("page2Photo");

    setInterval(() => {
        const photo = HUB_CONFIG.photos[photoIndex];
        const imgHTML = `<img src="${HUB_CONFIG.photosFolder}${photo}" style="max-width:100%; max-height:200px;">`;

        if (page1Photo) page1Photo.innerHTML = imgHTML;
        if (page2Photo) page2Photo.innerHTML = imgHTML;

        photoIndex = (photoIndex + 1) % HUB_CONFIG.photos.length;
    }, HUB_CONFIG.photoRotationTime || 30000);
}

// ==========================
// INIT (ONLY SAFE FEATURES)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
    rotatePhotos();
});
