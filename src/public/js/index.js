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
    if(cartCountShow){
        //counting cart
        let cartlength;
        if(JSON.parse(localStorage.getItem('Afseem_items')).length>0){
        cartlength=JSON.parse(localStorage.getItem('Afseem_items'))[0].products.length
        }  else{
            cartlength=0
        } 
        
        cartCountShow.textContent= cartlength
    }
    

    //hide and show profile icon of seller
    const profileicon = document.querySelector('.profileicon')
    const submenus = document.querySelector('.submenus')
    if(profileicon){
        profileicon.addEventListener('click',()=>{
            submenus.style.display='flex'
        })
    }
    
    if(submenus){
        // Hide dropdown when clicking outside
       document.addEventListener("click", function (e) {
           if (!e.target.closest(".submenus") && !e.target.closest(".profileicon")) {
               submenus.style.display = "none";
           }
       });
    }

    // google translation code here 
    

        
})
