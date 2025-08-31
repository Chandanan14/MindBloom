// settings.js
import { db, auth, doc, getDoc, updateDoc } from "/FB_added/firebase.js";

console.log("✅ settings.js loaded on", window.location.pathname);

// Only proceed if settingsLink exists
const settingsLink = document.getElementById("settingsLink");
if (settingsLink) {

  const settingsModal = document.getElementById("settingsModal");
  const closeBtn = settingsModal?.querySelector(".close-btn");
  const modalUsername = document.getElementById("modal-username");
  const modalEmail = document.getElementById("modal-email");
  const modalLogout = document.getElementById("modal-logout");
  const currentPfp = document.getElementById("current-pfp");
  const pfpOptions = document.querySelectorAll(".pfp-option");
  const pfpChooser = document.getElementById("pfp-chooser");
  const changePfpBtn = document.getElementById("change-pfp-btn");

  document.addEventListener("DOMContentLoaded", () => {

    // -----------------
    // Modal open/close
    // -----------------
    settingsLink.addEventListener("click", (e) => {
      e.preventDefault();
      settingsModal.style.display = "flex";
    });

    closeBtn?.addEventListener("click", () => settingsModal.style.display = "none");
    window.addEventListener("click", (e) => {
      if (e.target === settingsModal) settingsModal.style.display = "none";
    });

    // -----------------
    // Logout
    // -----------------
    modalLogout?.addEventListener("click", () => {
      auth.signOut().then(() => window.location.href = "login.html");
    });

    // -----------------
    // Auth & user data
    // -----------------
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }

      if (modalUsername && modalEmail && currentPfp) {
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

        // Show or hide PFP chooser / change button
        if (!userDocSnap.exists() || !userDocSnap.data().pfp) {
            if (pfpChooser) pfpChooser.style.display = "none";
            if (changePfpBtn) changePfpBtn.style.display = "block";

          
        } else {
            if (pfpChooser) pfpChooser.style.display = "none";
            if (changePfpBtn) changePfpBtn.style.display = "block";

        }
      }
    });

    // -----------------
    // PFP selection
    // -----------------
    if (pfpOptions && currentPfp) {
      pfpOptions.forEach(option => {
        option.addEventListener("click", async () => {
          const selectedPfp = option.textContent;

          // Update UI
          currentPfp.textContent = selectedPfp;

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
          if (pfpChooser) pfpChooser.style.display = "none";
          if (changePfpBtn) changePfpBtn.style.display = "block";
          
        });
      });
    }

    // -----------------
    // Change PFP button
    // -----------------
    if (changePfpBtn && pfpChooser) {
      changePfpBtn.addEventListener("click", () => {
        pfpChooser.style.display = "block";
        changePfpBtn.style.display = "none";
      });
    }

  }); // DOMContentLoaded end
} // settingsLink check end
