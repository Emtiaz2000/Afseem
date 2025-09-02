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
    if(errorCross){
        errorCross.addEventListener('click',()=>{
        errorContainer.style.display='none'
    })
    }

    
    
  
    const cartCountShow = document.querySelector('.cartCount');
    let cartlength = JSON.parse(localStorage.getItem('Afseem_items')) //|| 0
    let count;
    if(cartlength){
        count=cartlength.length
    }else{
        count=0
    }
    cartCountShow.textContent= count


})
