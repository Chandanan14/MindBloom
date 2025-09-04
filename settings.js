import { db, auth, collection, getDocs, doc, getDoc, query, where, updateDoc } from "./firebase.js";

const settingsLink = document.getElementById("settingsLink");
const settingsModal = document.getElementById("settingsModal");
const closeBtn = settingsModal.querySelector(".close-btn");
const modalUsername = document.getElementById("modal-username");
const modalEmail = document.getElementById("modal-email");
const modalLogout = document.getElementById("modal-logout");
const currentPfp = document.getElementById("current-pfp");
const pfpOptions = document.querySelectorAll(".pfp-option");
const pfpChooser = document.getElementById("pfp-chooser");
const changePfpBtn = document.getElementById("change-pfp-btn");

// Open modal
settingsLink.addEventListener("click", (e) => {
  e.preventDefault();
  settingsModal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => settingsModal.style.display = "none");
window.addEventListener("click", (e) => { if(e.target === settingsModal) settingsModal.style.display = "none"; });

// Logout
modalLogout.addEventListener("click", () => {
  auth.signOut().then(() => window.location.href = "login.html");
});

// Auth & user data
auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = "login.html"; return; }

  const userDocRef = doc(db, "users", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  let username = user.email.split("@")[0];
  let pfp = "😊";

  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    username = data.username || username;
    pfp = data.pfp || "😊";
  }

  modalUsername.textContent = username;
  modalEmail.textContent = user.email;
  currentPfp.textContent = pfp;
  greeting.innerHTML = `${pfp} Hello, <span id="name">${username}</span> 👋, hope you’re feeling okay today.`;

  if (!userDocSnap.exists() || !userDocSnap.data().pfp) {
    pfpChooser.style.display = "block";
    changePfpBtn.style.display = "none";
  } else {
    pfpChooser.style.display = "none";
    changePfpBtn.style.display = "block";
  }
});

// PFP selection
pfpOptions.forEach(option => {
  option.addEventListener("click", async () => {
    const selectedPfp = option.textContent;

    // Update UI
    currentPfp.textContent = selectedPfp;
    greeting.innerHTML = `${selectedPfp} Hello, <span id="name">${modalUsername.textContent}</span> 👋, hope you’re feeling okay today.`;

    // Save to Firestore
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { pfp: selectedPfp });
      }
    } catch (err) {
      console.error("Error saving PFP:", err);
    }

    // Hide chooser & show change button
    pfpChooser.style.display = "none";
    changePfpBtn.style.display = "block";
  });
});

// Change PFP button
changePfpBtn.addEventListener("click", () => {
  pfpChooser.style.display = "block";
  changePfpBtn.style.display = "none";
});


