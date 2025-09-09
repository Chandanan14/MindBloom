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
document.addEventListener("DOMContentLoaded", () => {
  // get current path, default to index
  let currentPath = window.location.pathname.split("/").pop() || "index.html";

  // remove ".html" if present
  currentPath = currentPath.replace(".html", "");

  document.querySelectorAll(".sidebar a").forEach(link => {
    let linkPath = link.getAttribute("href").split("/").pop();

    // remove ".html" if present
    linkPath = linkPath.replace(".html", "");

    if (linkPath === currentPath || (linkPath === "index" && currentPath === "")) {
      link.classList.add("active");
    }
  });
});
