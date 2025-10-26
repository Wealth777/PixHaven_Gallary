const sideToggle = document.getElementById('sideToggle');
const sidebar = document.querySelector('.sidebar');
const disuserName = document.getElementById('showUsername')
const disprofilePicture = document.getElementById('profilePicture');
const loader = document.getElementById('loader');


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZeXRLtizNVxoROHfCWwYFZYzCrrHUVjs",
  authDomain: "pixhaven-gallary.firebaseapp.com",
  databaseURL: "https://pixhaven-gallary-default-rtdb.firebaseio.com",
  projectId: "pixhaven-gallary",
  storageBucket: "pixhaven-gallary.firebasestorage.app",
  messagingSenderId: "22248391827",
  appId: "1:22248391827:web:d6617252875deab4da3966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase();

// load uses info
onAuthStateChanged(auth, (user) => {
  if (user) {
    loader.classList.add('hidden');
    const uid = user.uid;

    const loadInfo = ref(database, 'users/' + uid);
    onValue(loadInfo, (snapshot) => {
      const data = snapshot.val();
      const userEmail = user.email
      const userName = data.username
      const photoUrl = data.userImg || user.photoURL || './asset/unnamed-removebg-preview.png';

      disuserName.innerHTML = `<p style="color: azure;">${userName}</p>`
      disprofilePicture.src = photoUrl;

    });

  } else {
    Toastify({
      text: "No user logged in",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#ff4d4d",
    }).showToast();
    window.location.href = '../signin.html'
  }
});


// load users image
if (disprofilePicture) {
  disprofilePicture.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      disprofilePicture.src = previewUrl;

    } else {
      Toastify({
        text: "❌ No file selected!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#4CAF50",
      }).showToast();
    }
  });
}


// sidebar
sideToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});





const totalImages = 42;
const savedImages = 15;
const downloads = 30;

document.getElementById("total-images").textContent = totalImages;
document.getElementById("saved-images").textContent = savedImages;
document.getElementById("downloads").textContent = downloads;




const pixbotMsg = document.getElementById("pixbot-msg");
const greetings = [
  "📸 You’ve been active today! Keep exploring.",
  "🚀 3 new images added recently!",
  "💡 Tip: Save your favorite images for quick access.",
];
pixbotMsg.textContent = greetings[Math.floor(Math.random() * greetings.length)];








// Theme toggle
const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  if (theme === 'light') document.body.classList.add('light');
  else document.body.classList.remove('light');
}







// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});