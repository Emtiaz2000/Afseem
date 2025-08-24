window.addEventListener('DOMContentLoaded',()=>{
    const menuHamburderIcon = document.querySelector('.menu_hamburder')

    if(menuHamburderIcon){
        menuHamburderIcon.addEventListener('click',()=>{
        document.querySelector('.mobile_menu').style.display="flex";
        })

        let hideBtn = document.querySelector('.menuCross')
        hideBtn.addEventListener('click',()=>{
            document.querySelector('.mobile_menu').style.display="none";
        })
    }

    
})
