const disuserName = document.getElementById('showUsername');
const disEmail = document.getElementById('email');
const disName = document.getElementById('displayName');
const edit = document.getElementById('editInfo');
const disprofilePicture = document.getElementById('profilePicture');
const disprofilePreview = document.getElementById('profilePreview');
const loader = document.getElementById('loader');
const changePicture = document.getElementById('changePP')
const changePictureInp = document.getElementById('userpic')

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAZeXRLtizNVxoROHfCWwYFZYzCrrHUVjs",
    authDomain: "pixhaven-gallary.firebaseapp.com",
    databaseURL: "https://pixhaven-gallary-default-rtdb.firebaseio.com",
    projectId: "pixhaven-gallary",
    storageBucket: "pixhaven-gallary.appspot.com",
    messagingSenderId: "22248391827",
    appId: "1:22248391827:web:d6617252875deab4da3966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
let currentUser;



onAuthStateChanged(auth, async (user) => {
    if (!user) {
        currentUser = null;
        Toastify({
            text: "No user logged in",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#ff4d4d",
        }).showToast();
        window.location.href = '../signin.html'
    }
    loader.classList.add('hidden');
    currentUser = user;
    const uid = user.uid;
    const userRef = ref(database, 'users/' + uid);

    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const userEmail = data.email || user.email;
            const userName = data.username || user.displayName || "Unknown User";
            const photoUrl = data.userImg || user.photoURL || './asset/unnamed-removebg-preview.png';

            disuserName.innerHTML = `<p style="color: azure;">${userName}</p>`;
            disName.value = userName;
            disEmail.value = userEmail;
            disprofilePicture.src = photoUrl;
            disprofilePreview.src = photoUrl;
        } else {
            Toastify({
                text: "⚠️ No user data found in database for:", uid,
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#4CAF50",
            }).showToast();
        }
    } catch (error) {
        Toastify({
            text: "❌ Error loading user data:!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50",
        }).showToast();
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

changePicture.addEventListener('click', () => {
    changePictureInp.click();
});

changePictureInp.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            disprofilePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// edit users info
edit.addEventListener('click', async () => {
    if (!currentUser) {
        Toastify({
            text: "❌ No users is signed in!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50",
        }).showToast();
        return;
    }

    const uid = currentUser.uid;
    let newImgUrl = disprofilePreview.src;

    await update(ref(database, 'users/' + uid), {
        username: disName.value,
        userImg: newImgUrl
    });

    Toastify({
        text: "✅ Profile updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#4CAF50",
    }).showToast();

    window.location.href = '../pages/settings.html'
});



// sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar')
    const sideToggle = document.getElementById('sideToggle');

    sideToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
});



// log out
const logoutBtn = document.querySelector('.logout-btn');
const deleteBtn = document.querySelector('.delete-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        signOut(auth).then(() => {
            Toastify({
                text: "✅ Logged out successfully!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#4CAF50",
            }).showToast();
            window.location.href = '../signin.html'
        }).catch((error) => {
            Toastify({
                text: "❌ An error occur trying to log out user!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "#4CAF50",
            }).showToast();

        });
    });
}































document.addEventListener('DOMContentLoaded', function () {
    const profilePicInput = document.getElementById('profilePicture');
    const profilePreview = document.getElementById('profilePreview');
    const changePictureBtn = document.querySelector('.change-picture-btn');

    if (changePictureBtn) {
        changePictureBtn.addEventListener('click', () => {
            profilePicInput.click();
        });
    }

    if (profilePicInput) {
        profilePicInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    profilePreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }


    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.dataset.theme;
            setTheme(theme);
            themeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });


    const layoutSelect = document.getElementById('layoutDensity');
    if (layoutSelect) {
        layoutSelect.addEventListener('change', function () {
            document.body.dataset.density = this.value;
            localStorage.setItem('layoutDensity', this.value);
        });
    }


    function loadSavedSettings() {
        const savedDensity = localStorage.getItem('layoutDensity');
        if (savedDensity && layoutSelect) {
            layoutSelect.value = savedDensity;
            document.body.dataset.density = savedDensity;
        }


        const emailNotif = localStorage.getItem('emailNotifications') === 'true';
        const pushNotif = localStorage.getItem('pushNotifications') === 'true';
        const newsletter = localStorage.getItem('newsletter') === 'true';

        document.getElementById('emailNotif').checked = emailNotif;
        document.getElementById('pushNotif').checked = pushNotif;
        document.getElementById('newsletter').checked = newsletter;
    }



    const notificationToggles = document.querySelectorAll('.toggle input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            localStorage.setItem(this.id, this.checked);
        });
    });



    const profileForm = document.querySelector('.profile-settings form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            console.log('Saving profile changes...', Object.fromEntries(formData));
            showNotification('Profile updated successfully!');
        });
    }





    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            if (confirm('⚠️ Warning: This action cannot be undone. Are you sure you want to delete your account?')) {
                console.log('Deleting account...');
            }
        });
    }



    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadSavedSettings();
});