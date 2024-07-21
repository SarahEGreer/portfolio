const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(max-width: 700px)');
const navMenuContainer = document.querySelector('.nav_menu_container');
const main = document.querySelector('main');
const navLink = document.querySelectorAll('.nav_link_container');
const navContainer = document.querySelector('.nav-container');
const scrollWatcher = document.createElement('div');
const sticking = document.querySelector('.sticking');




// ****** nav bar logic ********

// set initial nav bar color change at scroll

scrollWatcher.setAttribute('data-scroll-watcher', '');
navContainer.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
    navContainer.classList.toggle('sticking', !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

// change nav bar display upon scroll

function scrollEvent(fn){
    let last_known_scroll_position = 0;
    let ticking = false;

    window.addEventListener("scroll", function (){
        let previous_known_scroll_position = last_known_scroll_position;
        last_known_scroll_position = window.scrollY;

        if(!ticking){
            window.requestAnimationFrame(function(){
                fn(last_known_scroll_position, previous_known_scroll_position);
                ticking = false;
            });
            ticking = true;
        }
    });
}

scrollEvent((scrollPos, previousScrollPos) => {
    if(previousScrollPos > scrollPos){
        navContainer.style.display = "flex";
    } else{
        navContainer.style.display = "none";
    }
});

// hide navbar after click

function hideMenu(){
    setTimeout(() => {
        navContainer.style.display = "none";
    }, 50);
}

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
        navLink.forEach((link) => {
            link.addEventListener('click', hideMenu);
        })
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