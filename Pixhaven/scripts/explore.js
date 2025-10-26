const API_KEY = "52759622-4b94cecbab476ddda57a1b83a";
const BASE_URL = "https://pixabay.com/api/";




const gallery = document.getElementById("gallery");
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const author = document.getElementById("author");
const downloadLink = document.getElementById("downloadLink");
const closeBtn = document.querySelector(".close-btn");
const themeToggle = document.getElementById("themeToggle");




async function fetchImages(category = "") {
  const url = `${BASE_URL}?key=${API_KEY}&q=${category || "trending"}&image_type=photo&per_page=30`;
  const response = await fetch(url);
  const data = await response.json();
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



function openModal(img) {
  modal.classList.remove("hidden");
  modalImg.src = img.largeImageURL;
  author.textContent = img.user;
  downloadLink.href = img.largeImageURL;
}



closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });



document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    fetchImages(category);
  });
});


themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "🌞";
});




// Load trending images by default
fetchImages();
