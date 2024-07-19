const btnOpen = document.querySelector('#btnOpen');
const btnClose = document.querySelector('#btnClose');
const media = window.matchMedia('(max-width: 700px)');
const navMenuContainer = document.querySelector('.nav_menu_container');
const main = document.querySelector('main');

function setupNav(e){
    if(e.matches){
        console.log('is mobile');
        navMenuContainer.setAttribute('inert', '');
        navMenuContainer.style.transition = 'none';
    } else{
        console.log('is not mobile');
        navMenuContainer.removeAttribute('inert');
        closeMobileMenu();
    }
}

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