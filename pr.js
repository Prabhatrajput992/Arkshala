
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


// slider
let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    
    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

showSlides();
