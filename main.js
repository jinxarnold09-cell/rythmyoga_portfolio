/* ==========================
   RYTHM YOGA - MAIN.JS
========================== */

/* HERO IMAGE SLIDER */

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}

function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

if (slides.length > 0) {
    setInterval(nextSlide, 4000);
}

/* ==========================
   MEMBERSHIP MODAL
========================== */

const modal = document.getElementById("checkoutModal");
const closeBtn = document.querySelector(".close");
const joinButtons = document.querySelectorAll(".join-btn");
const selectedPlanBox = document.getElementById("selectedPlan");

let selectedPlan = "";
let selectedPrice = "";

joinButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedPlan = button.dataset.plan;
        selectedPrice = button.dataset.price;

        selectedPlanBox.innerHTML = `
            <strong>Selected Plan:</strong> ${selectedPlan}<br>
            <strong>Price:</strong> ₹${selectedPrice}/month
        `;

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

});

if (closeBtn) {

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

}

window.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

});

/* ==========================
   CHECKOUT FORM
========================== */

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const inputs = checkoutForm.querySelectorAll("input");

        let valid = true;

        inputs.forEach(input => {

            if (input.value.trim() === "") {
                valid = false;
            }

        });

        if (!valid) {
            alert("Please fill all required fields.");
            return;
        }

        const memberData = {
            name: inputs[0].value,
            email: inputs[1].value,
            phone: inputs[2].value,
            plan: selectedPlan,
            price: selectedPrice
        };

        localStorage.setItem(
            "rythmYogaMember",
            JSON.stringify(memberData)
        );

        checkoutForm.innerHTML = `
            <div style="text-align:center;padding:20px;">
                <h2 style="margin-bottom:15px;color:#4f7cff;">
                    Enrollment Successful 🎉
                </h2>

                <p style="margin-bottom:15px;">
                    Thank you for joining
                    <strong>Rythm Yoga</strong>
                </p>

                <p>
                    Your selected plan:
                    <strong>${selectedPlan}</strong>
                </p>

                <p style="margin-top:10px;">
                    Amount:
                    <strong>₹${selectedPrice}</strong>
                </p>

                <button
                    id="closeSuccess"
                    style="
                        margin-top:20px;
                        width:100%;
                        padding:15px;
                        border:none;
                        border-radius:12px;
                        background:linear-gradient(135deg,#4f7cff,#a855f7);
                        color:#fff;
                        cursor:pointer;
                    "
                >
                    Continue
                </button>
            </div>
        `;

        document
            .getElementById("closeSuccess")
            .addEventListener("click", () => {

                modal.style.display = "none";
                document.body.style.overflow = "auto";

                location.hash = "#home";
            });

    });

}

/* ==========================
   NAVBAR BACKGROUND
========================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(0,0,0,.9)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";

    } else {

        header.style.background = "rgba(0,0,0,.45)";
        header.style.boxShadow = "none";
    }

});

/* ==========================
   SMOOTH NAVIGATION
========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});

/* ==========================
   SCROLL ANIMATION
========================== */

const revealElements = document.querySelectorAll(
    ".program-card, .plan-card, .gallery-grid img, .stat-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .7s ease";

    revealObserver.observe(el);

});

/* ==========================
   GALLERY LIGHTBOX
========================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        const lightbox = document.createElement("div");

        lightbox.style.position = "fixed";
        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";
        lightbox.style.background = "rgba(0,0,0,.95)";
        lightbox.style.display = "flex";
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightbox.style.zIndex = "10000";

        const image = document.createElement("img");

        image.src = img.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "20px";

        lightbox.appendChild(image);

        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", () => {
            lightbox.remove();
        });

    });

});

/* ==========================
   CONTACT FORM
========================== */

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert(
            "Thank you for contacting Rythm Yoga. We'll get back to you soon."
        );

        contactForm.reset();

    });

}

/* ==========================
   CONSOLE MESSAGE
========================== */

console.log(`
🧘 Rythm Yoga Website Loaded Successfully
Built with HTML, CSS & JavaScript
`);