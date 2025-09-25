window.addEventListener('DOMContentLoaded',()=>{
    loadUi()
    

    

})





//delete product from locastorage
function deleteCartItems(index,storeid){
    let stores = JSON.parse(localStorage.getItem('Afseem_items'))
    
    //console.log(findstore)
    //console.log(stores)
    
        stores.forEach(store=>{
            store.products.forEach((item,ind)=>{
                //console.log(item)
                if(index==ind){
                    store.products.splice(ind,1)
                }
            })
        })
    
    if(stores[0].products.length>0){
        localStorage.setItem('Afseem_items',JSON.stringify(stores))
    }else{
        stores=[]
        localStorage.setItem('Afseem_items',JSON.stringify(stores))
    }
    
    /* const cartcontainer = document.querySelector('.cartcontainer')
    cartcontainer.innerHTML='' */
    loadUi()
}

//loading ui with localstorage
function loadUi(){
    const cartCountShow = document.querySelector('.cartCount');
    let cartCount;
    if(JSON.parse(localStorage.getItem('Afseem_items')).length>0){
        cartCount=JSON.parse(localStorage.getItem('Afseem_items'))[0].products.length
    }  else{
        cartCount=0
    } 
    cartCountShow.textContent=cartCount
    const cartcontainer = document.querySelector('.cartcontainer')
    cartcontainer.innerHTML=''
    let cartItems=''
    
    let cartfromLocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))
    if(cartfromLocalstorage != null){
        if(cartfromLocalstorage.length>0){
        let currency=cartfromLocalstorage[0].products[0].currency
        cartfromLocalstorage.forEach(store => {
        let price=0
        let storeiddiv = document.createElement('div')
        storeiddiv.innerHTML=`<p>Store Id: ${store.storeid}</p>`
        const div = document.createElement('div')
        div.className='allcartitems'
        store.products.forEach((item,index)=>{
            currency=item.currency
            price+=(item.productqty*item.productprice)
            cartItems+=`
            <div class="singleproduct">
            <div class="productinfo">
                <div class="productimg">
                    <img src="${item.productimageurl}" alt="">
                    <div class="productname">
                        <h1>${item.productname}</h1>
                        <span class="productsku">sku:${item.productsku}</span>
                    </div>
                </div>
                
            </div>
            <div class="counterandprice">
                <p class="productcount">
                    <button data-storeid="${store.storeid}" data-index="${index}" data-productid="${item.productid}" class="dec_icon"><span><i class="fa-solid fa-minus"></i></span></button>
                    <span class="item_count" data-quantity="${item.productqty}">${item.productqty}</span>
                    <button data-storeid="${store.storeid}" data-index="${index}" data-productid="${item.productid}" class="inc_icon"><span><i class="fa-solid fa-plus"></i></span></button>
                </p>
                <p class="totalprice" data-price="${item.productprice}">Total Price: <span>${item.productprice * item.productqty} </span>${item.currency}</p>
                <button data-storeid="${store.storeid}" data-index="${index}" class="removeitem">Remove Item</button>
            </div>
        </div>`
            
        })
        cartcontainer.appendChild(storeiddiv)
        div.innerHTML=cartItems
        cartcontainer.appendChild(div)
       
        let grandtotaldiv = document.createElement('div')
        grandtotaldiv.className='grandtotalsection'
        grandtotaldiv.innerHTML=`
        <p>Grand Total: <span class="grandtotal">${price} ${currency}</span></p>
        <div><a class="checkoutbtn" href='/cart/${store.storeid}'>Checkout</a></div>
        <br/><hr/>
        `
       cartcontainer.appendChild(grandtotaldiv)
       cartItems='';



       const incrimentBtns = document.querySelectorAll('.inc_icon');
       const decrimentBtns = document.querySelectorAll('.dec_icon');
        //increase counter 
        incrimentBtns.forEach((incrimentbtn)=>{
            incrimentbtn.addEventListener('click',()=>{
                let itemCount = Number(incrimentbtn.previousElementSibling.getAttribute('data-quantity'))
                if(itemCount>=15){
                    itemCount=15
                }else{
                    itemCount++
                }
                incrimentbtn.previousElementSibling.textContent = itemCount
                incrimentbtn.previousElementSibling.setAttribute('data-quantity',itemCount) 
                let storeid = incrimentbtn.dataset.storeid;
                let productid = incrimentbtn.dataset.productid;
                updateCartQuantity(storeid,productid,itemCount)
                loadUi()
            })
        })

        //decrease counter
        //increase counter 
        decrimentBtns.forEach((deccrimentbtn)=>{
            deccrimentbtn.addEventListener('click',()=>{
                let itemCount = Number(deccrimentbtn.nextElementSibling.getAttribute('data-quantity'))
                if(itemCount <= 1){
                    itemCount=1
                }else{
                    itemCount--   
                }
                deccrimentbtn.nextElementSibling.textContent = itemCount
                deccrimentbtn.nextElementSibling.setAttribute('data-quantity',itemCount) 
                let storeid = deccrimentbtn.dataset.storeid;
                let productid = deccrimentbtn.dataset.productid;
                updateCartQuantity(storeid,productid,itemCount)
                loadUi()
            })
        })
    });
        
    }else{
        cartcontainer.innerHTML=`
        <div>Nothing in Cart!</div>
        <a style="text-decoration:underline; color:#F7931E;" href="/store-category">Go to Store</a>
        `
    }
    }else{
        cartcontainer.innerHTML=`
        <div>Nothing in Cart!</div>
        <a style="text-decoration:underline; color:#F7931E;" href="/store-category">Go to Store</a>
        `
    }

    //delete function 
    let deletebtns = document.querySelectorAll('.removeitem')
    if(deletebtns){
        deletebtns.forEach((deletebtn)=>{
            deletebtn.addEventListener('click', (e) => {
                //console.log(e.target)
                let indx = deletebtn.dataset.index
                let storeid = deletebtn.dataset.storeid
                deleteCartItems(indx, storeid)
            });
        })
    }
    

}

function updateCartQuantity(storeid,productid,updateqty){
    let cartfromLocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))
    cartfromLocalstorage.forEach(stores=>{
        if(stores.storeid==storeid){
            stores.products.forEach((products)=>{
                if(products.productid==productid){
                    products.productqty=updateqty
                }
            })
        }
    })

    localStorage.setItem('Afseem_items',JSON.stringify(cartfromLocalstorage))
}