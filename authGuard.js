// authGuard.js
import { auth } from "./firebase.js";

export function protectPage(redirectTo = "login.html") {
    auth.onAuthStateChanged(user => {
        if (!user) {
            window.location.href = redirectTo;
        } else {
            document.body.style.display = "block"; // show once logged in
        }
    });
}



/* ===== Sidebar Active Link ===== */
const currentPath = window.location.pathname.split("/").pop(); // e.g., "index.html"

document.querySelectorAll(".sidebar a").forEach(link => {
  const linkPath = link.getAttribute("href").split("/").pop();
  if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
    link.classList.add("active");
  }
});


