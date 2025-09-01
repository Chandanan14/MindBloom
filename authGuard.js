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
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

