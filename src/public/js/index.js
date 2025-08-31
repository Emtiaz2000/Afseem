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


    let errorCross = document.querySelector('.crossError')
    let errorContainer =document.querySelector('.errorContainer')

    errorCross.addEventListener('click',()=>{
        errorContainer.style.display='none'
    })
    
  
    
    


})
