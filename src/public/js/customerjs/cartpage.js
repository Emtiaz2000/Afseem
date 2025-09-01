window.addEventListener('DOMContentLoaded',()=>{
    loadUi()
    document.querySelector('.cartcontainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('removeitem')) {
            let indx = e.target.dataset.index
            let storeid = e.target.dataset.storeid
            deleteCartItems(indx, storeid)
        }
    });

    deleteEmptyStorecart()
})

function deleteEmptyStorecart(){
    let cartfromLocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))
    cartfromLocalstorage.forEach((stores,index)=>{
        if(stores.products.length<1){
            cartfromLocalstorage.splice(index,1)
        }
    })
    localStorage.setItem('Afseem_items',JSON.stringify(cartfromLocalstorage))
}


//delete product from locastorage
function deleteCartItems(index,storeid){
    let stores = JSON.parse(localStorage.getItem('Afseem_items'))
    let findstore = stores.find((store)=>{
       return store.storeid ==storeid ;
         
    })
    if(findstore){
        stores.forEach(store=>{
            if(store.storeid==storeid){
                store.products.forEach((item)=>{
                    //console.log(item)
                    store.products.splice(index,1)
                })
            }
        })
    }
    localStorage.setItem('Afseem_items',JSON.stringify(stores))
    /* const cartcontainer = document.querySelector('.cartcontainer')
    cartcontainer.innerHTML='' */
    deleteEmptyStorecart()
    loadUi()
}

//loading ui with localstorage
function loadUi(){
    console.log('loaded')
    const cartcontainer = document.querySelector('.cartcontainer')
    cartcontainer.innerHTML=''
    let cartItems=''
    let cartfromLocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))
    if(cartfromLocalstorage.length>0){
        cartfromLocalstorage.forEach(store => {
        let price=0
        let storeiddiv = document.createElement('div')
        storeiddiv.innerHTML=`<p>Store Id: ${store.storeid}</p>`
        const div = document.createElement('div')
        div.className='allcartitems'
        store.products.forEach((item,index)=>{
            
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
        <p>Grand Total: <span class="grandtotal">${price} </span></p>
        <div><a href='/cart/${store.storeid}'>Checkout</a></div>
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
        cartcontainer.innerHTML='Nothing in Cart'
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