document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const observerOptions = {
        root: null,         // Uses the browser viewport
        rootMargin: "0px",  // Triggers exactly at the viewport boundaries
        threshold: 0.15     // Fired when 15% of the element is visible on screen
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that handles the smooth transition
                entry.target.classList.add("reveal-active");

                // Unobserve the element so the animation only plays once
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const bodyElement = document.body;
    const navbarInstance = document.getElementById("main-navbar");

    // 1. Manually initialize Bootstrap's ScrollSpy engine
    let scrollSpy = new bootstrap.ScrollSpy(bodyElement, {
        target: "#main-navbar"
    });

    // 2. Intercept clicks on navbar links
    navbarInstance.addEventListener("click", (e) => {
        const clickedLink = e.target.closest(".nav-link");
        if (!clickedLink) return;

        // Temporarily destroy ScrollSpy so it ignores the rapid intersection changes
        scrollSpy.dispose();

        // Strip the active class from all links instantly
        navbarInstance.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
        });

        // Visually set only the clicked link to active immediately
        clickedLink.classList.add("active");

        // 3. Wait for the smooth scroll momentum to completely finish
        let scrollTimeout;
        const reEnableScrollSpy = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Re-instantiate tracking once scrolling has fully stopped
                scrollSpy = new bootstrap.ScrollSpy(bodyElement, {
                    target: "#main-navbar"
                });
                window.removeEventListener("scroll", reEnableScrollSpy);
            }, 100); // 100ms buffer after the last scroll tick
        };

        window.addEventListener("scroll", reEnableScrollSpy);
    });


    const navContent = document.querySelector('#navbarSupportedContent');

    const navLinks = Array.from(navContent.querySelectorAll('.nav-link'));

    navContent.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');

        if (link) {
            navLinks.forEach(e => e.classList.remove('active'));
            link.classList.add('active');
        }
    })


});