$(document).ready(function () {
    loadHeader();
    initHeroAnimation();
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
