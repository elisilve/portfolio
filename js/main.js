$(document).ready(function () {
    loadHeader();
    loadFooter();
    initCounters();
    initTitleAnimation();
});

function loadHeader() {
    const $headerPlaceholder = $("#header");

    if (!$headerPlaceholder.length) return;

    $headerPlaceholder.load("components/header.html", function () {
        setActiveNavLink();
        initMobileMenu();
        initHeaderOnScroll();
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    $(".header-nav a").each(function () {
        const linkPage = $(this).attr("href");

        if (linkPage === currentPage) {
            $(this).addClass("active");
        }
    });
}

function initMobileMenu() {
    const $toggle = $(".menu-toggle");
    const $nav = $(".header-nav");

    if (!$toggle.length || !$nav.length) return;

    $toggle.on("click", function () {
        $(this).toggleClass("active");
        $nav.toggleClass("open");
        $("body").toggleClass("menu-open");
    });
}

function initHeaderOnScroll() {
    const $header = $(".site-header");

    if (!$header.length) return;

    $(window).on("scroll", function () {
        $header.toggleClass("scrolled", $(window).scrollTop() > 20);
    });
}


//animazione count
function initCounters() {
    const $counters = $(".counter");

    console.log("Counters trovati:", $counters.length);
    console.log("GSAP:", typeof gsap);
    console.log("ScrollTrigger:", typeof ScrollTrigger);

    if (!$counters.length) return;
    if (typeof gsap === "undefined") return;
    if (typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    $counters.each(function () {
        const counter = this;
        const $counter = $(this);
        const target = Number($counter.data("target"));

        const obj = { value: 0 };

        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".intro",
                start: "top 75%",
                once: true
            },
            onUpdate: function () {
                $counter.text(Math.floor(obj.value));
            },
            onComplete: function () {
                $counter.text(target);
            }
        });
    });
}

// Title animation tag h1 and h2
$(document).ready(function () {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    $(entry.target).addClass("animate"); 
                }, 500);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    $("h1, h2").each(function () {
        observer.observe(this); 
    });
});

//Footer
function loadFooter() {
    const $footerPlaceholder = $("#footer");

    if (!$footerPlaceholder.length) return;

    $footerPlaceholder.load("components/footer.html");
}