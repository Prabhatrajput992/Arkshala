
// active nabvar
document.addEventListener("DOMContentLoaded", function () {
    // Get current URL
    let currentPage = window.location.pathname.split("/").pop();

    // Select all nav links
    let navLinks = document.querySelectorAll(".nav-link");

    // Loop through links and add 'active' class to the current page
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});
