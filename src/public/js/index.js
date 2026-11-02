
window.addEventListener('DOMContentLoaded', () => {

    // =========================
    // MOBILE MENU
    // =========================

    const menuHamburderIcon = document.querySelector('.menu_hamburder');
    const mobileMenu = document.querySelector('.mobile_menu');
    const hideBtn = document.querySelector('.menuCross');

    if (menuHamburderIcon && mobileMenu) {
        menuHamburderIcon.addEventListener('click', () => {
            mobileMenu.style.display = "flex";
        });
    }

    if (hideBtn && mobileMenu) {
        hideBtn.addEventListener('click', () => {
            mobileMenu.style.display = "none";
        });
    }


    // =========================
    // ERROR MESSAGE CLOSE
    // =========================

    const errorCross = document.querySelector('.crossError');
    const errorContainer = document.querySelector('.errorContainer');

    if (errorCross && errorContainer) {
        errorCross.addEventListener('click', () => {
            errorContainer.style.display = 'none';
        });
    }


    // =========================
    // CART COUNT
    // =========================

    const cartCountShow = document.querySelector('.cartCount');

    if (cartCountShow) {

        let cartlength = 0;

        try {
            const cartData = JSON.parse(
                localStorage.getItem('Afseem_items') || '[]'
            );

            if (Array.isArray(cartData) && cartData.length > 0) {

                const products = cartData[0]?.products;

                cartlength = Array.isArray(products)
                    ? products.length
                    : 0;
            }

        } catch (error) {
            console.error('Cart data error:', error);
            cartlength = 0;
        }

        cartCountShow.textContent = cartlength;
    }


    // =========================
    // SELLER PROFILE DROPDOWN
    // =========================

    const profileicon = document.querySelector('.profileicon');
    const submenus = document.querySelector('.submenus');

    if (profileicon && submenus) {

        profileicon.addEventListener('click', (e) => {
            e.stopPropagation();

            submenus.style.display =
                submenus.style.display === 'flex' ? 'none' : 'flex';
        });

        document.addEventListener('click', (e) => {

            if (
                !e.target.closest('.submenus') &&
                !e.target.closest('.profileicon')
            ) {
                submenus.style.display = 'none';
            }

        });
    }


    // =========================
    // SERVICE WORKER
    // =========================

    if ('serviceWorker' in navigator) {

        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('Service Worker registered:', reg.scope);
            })
            .catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    }

});


// =========================
// BACK BUTTON HANDLING
// =========================

window.addEventListener('pageshow', function(event) {

    const navigationEntry = performance.getEntriesByType('navigation')[0];

    if (
        event.persisted ||
        navigationEntry?.type === 'back_forward'
    ) {
        window.location.reload();
    }

});
