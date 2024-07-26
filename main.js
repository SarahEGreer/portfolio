const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(max-width: 700px)');
const navMenuContainer = document.querySelector('.nav_menu-container');
const main = document.querySelector('main');
const navLink = document.querySelectorAll('.nav_link-container');
const sectionLink = document.querySelectorAll('.section-link');
const navContainer = document.querySelector('.nav_container');
const scrollWatcher = document.createElement('div');
const sticking = document.querySelector('.sticking');


// ****** nav bar logic ********
scrollWatcher.setAttribute('data-scroll-watcher', '');
navContainer.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
    navContainer.classList.toggle('sticking', !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

// hide menu and change to inert for mobile menu

function setupNav(e){
    if(e.matches){
        navMenuContainer.setAttribute('inert', '');
        navMenuContainer.style.transition = 'none';
        navLink.forEach((link) => {
            link.addEventListener('click',closeMobileMenu);
        });
        
    } else{
        closeMobileMenu();
        navMenuContainer.removeAttribute('inert');
    }
}

// handle mobile menu

function openMobileMenu(){
    btnOpen.setAttribute('aria-expanded', 'true');
    navMenuContainer.removeAttribute('inert');
    navMenuContainer.removeAttribute('style');
    main.setAttribute('inert', '');
}

function closeMobileMenu(){
    btnOpen.setAttribute('aria-expanded', 'false');
    navMenuContainer.setAttribute('inert', '');
    main.removeAttribute('inert')

    setTimeout(() => {
        navMenuContainer.style.transition = 'none';
    }, 500);
}

setupNav(media);

btnOpen.addEventListener('click', openMobileMenu);
btnClose.addEventListener('click', closeMobileMenu);

media.addEventListener('change', function(e){
    setupNav(e);
});

