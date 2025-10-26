const API_KEY = "52759622-4b94cecbab476ddda57a1b83a";
const BASE_URL = "https://pixabay.com/api/";

let page = 1;
let currentQuery = "nature";

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const categoryFilter = document.getElementById("categoryFilter");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("imageModal");
const offlineOverlay = document.getElementById("offlineOverlay");


async function fetchImages(query = currentQuery, pageNum = 1, perPage = 24) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&per_page=${perPage}&page=${pageNum}`;
  const response = await fetch(url);
  const data = await response.json();

  if (pageNum === 1) {
    gallery.innerHTML = "";
  }

  displayImages(data.hits);
}


function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach(img => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
    item.innerHTML = `
      <img src="${img.webformatURL}" alt="${img.tags}">
      <div class="overlay">
        <p>${img.user}</p>
      </div>
    `;
    item.addEventListener("click", () => openModal(img));
    gallery.appendChild(item);
  });
}



searchBtn.addEventListener("click", () => {
  currentQuery = searchInput.value || "random";
  page = 1;
  gallery.innerHTML = "";
  fetchImages(currentQuery, page);
});




categoryFilter.addEventListener("change", (e) => {
  currentQuery = e.target.value || "random";
  page = 1;
  gallery.innerHTML = "";
  fetchImages(currentQuery, page);
});





loadMoreBtn.addEventListener("click", () => {
  fetchImages(currentQuery, 1, 50);
});





themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "🌞";
});




const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const photographer = document.getElementById("photographer");
const resolution = document.getElementById("resolution");
const downloadBtn = document.getElementById("downloadBtn");

function openModal(photo) {
  modal.style.display = "flex";
  modalImage.src = photo.largeImageURL;
  photographer.textContent = photo.user;
  resolution.textContent = `${photo.imageWidth} x ${photo.imageHeight}`;
  downloadBtn.onclick = () => window.open(photo.largeImageURL, "_blank");
}

closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

window.addEventListener("online", () => (offlineOverlay.style.display = "none"));
window.addEventListener("offline", () => (offlineOverlay.style.display = "flex"));

fetchImages(currentQuery);
