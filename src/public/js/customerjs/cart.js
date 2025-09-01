
const incrimentBtns = document.querySelectorAll('.inc_icon');
const decrimentBtns = document.querySelectorAll('.dec_icon');
const cartCountShow = document.querySelector('.cartCount');
const cartBtns = document.querySelectorAll('.addtocart')

let itemprice =1;
let grandtotal = 1;
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
        incrimentbtn.parentElement.nextElementSibling.setAttribute('data-quantity',itemCount)
        let price = Number(incrimentbtn.parentElement.nextElementSibling.getAttribute('data-price'))//priceamount
        //after increase price 
        let updateprice = price*itemCount
        incrimentbtn.parentElement.previousElementSibling.children[0].textContent=updateprice
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
        deccrimentbtn.parentElement.nextElementSibling.setAttribute('data-quantity',itemCount)
        let price = Number(deccrimentbtn.parentElement.nextElementSibling.getAttribute('data-price'))//priceamount
        //after increase price 
        let updateprice = price*itemCount
        deccrimentbtn.parentElement.previousElementSibling.children[0].textContent=updateprice
    })
})

cartBtns.forEach((cartbtn)=>{
    cartbtn.addEventListener('click',()=>{
    let local_cart;
    if(localStorage.getItem('Afseem_items')===null){
        local_cart=[]
    }else{
        local_cart =JSON.parse(localStorage.getItem('Afseem_items')) 
    }
    let productimageurl = cartbtn.dataset.imageurl
    let productname = cartbtn.dataset.productname
    let productsku = cartbtn.dataset.sku
    let productprice = Number(cartbtn.dataset.price)
    let productid = cartbtn.dataset.productid
    let storeid = cartbtn.dataset.storeid
    let productqty = Number(cartbtn.dataset.quantity)
    let currency = cartbtn.dataset.currency
    let storewhatsapp = cartbtn.dataset.whatsapp
    
    if(local_cart.length>0){ 
    let updatedData = JSON.parse(localStorage.getItem('Afseem_items')) 
    let findStore = updatedData.find(stores=>{
        return stores.storeid==storeid
    })
    if(findStore){
        updatedData.forEach((items)=>{
            if(items.storeid == storeid ){
                let existingitem = items.products.find((product)=>{
                    return product.productid== productid
                })
                if(existingitem){
                    existingitem.productqty=Number(existingitem.productqty)+productqty;
                }else{
                    items.products.push({productimageurl,productname,productsku,productprice,productid,productqty,currency})
                }
            }
            
        }) 
        localStorage.setItem('Afseem_items',JSON.stringify(updatedData))
    }else{
        local_cart.push({'storeid':storeid, "products":[{productimageurl,productname,productsku,productprice,productid,productqty,currency}],whatsapp:storewhatsapp})
        localStorage.setItem('Afseem_items',JSON.stringify(local_cart))
    }
   
      
    //local_cart.push({'storeid':storeid, "products":[{productimageurl,productname,productsku,productprice,productid,productqty,currency}]})
    }else{
     local_cart.push({'storeid':storeid, "products":[{productimageurl,productname,productsku,productprice,productid,productqty,currency}],whatsapp:storewhatsapp})
     localStorage.setItem('Afseem_items',JSON.stringify(local_cart))
    }
    
    
    })
  
})