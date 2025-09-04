//load items from localstorage
window.addEventListener('DOMContentLoaded',()=>{
    const allitemscontainer = document.querySelector('.allitemscontainer') 
    const checkoutBtn = document.querySelector('.checkoutbtn')
    const grandtotaldiv = document.querySelector('.grandtotal')
    const cartCountShow = document.querySelector('.cartCount');
    UiRender()
    const confirmorderbtn = document.querySelector('#confirmorder')
    confirmorderbtn.addEventListener('click',async ()=>{
        const urlpath =window.location.pathname.split("/"); 
        const id = urlpath[urlpath.length - 1];
        let datafromlocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))||0
        if(datafromlocalstorage.length>0){
        let store = datafromlocalstorage.find( store => store.storeid==id)//store.storeid==id
        if(store){
            let currency = store.products[0].currency;
            let productsname=[];
            let productids =[];
            let productprices=[];
            let productquantities=[];
            let grandtotal=0;
            let storeid= store.storeid
            let storecategory= store.storecategory
            store.products.forEach(product=>{
            productsname.push(product.productname)
            productids.push(product.productid)
            productprices.push(product.productprice)
            productquantities.push(product.productqty)
            grandtotal+=product.productprice*product.productqty
        })
        try {
            document.querySelector('.loader').style.display='flex'
            let data ={
                storeid,
                currency,
                productsname,
                productids,
                productprices,
                productquantities,
                grandtotal,
                storecategory,
            }
            const datapost = await fetch(`/checkout/${store.storeId}`,{       // your backend endpoint
                method: "POST",
                headers: {
                "Content-Type": "application/json"  // tell server it's JSON
                },
                body: JSON.stringify(data)   // convert JS object to JSON
            })
            allitemscontainer.innerHTML=`<h1>Checkout</h1><p>No Product in Checkout!</p>`
            checkoutBtn.style.display='none'
            grandtotaldiv.style.display='none'
            updatelocastorageafterorder(storeid)
            const res = await datapost.json()
            if(res){
                cartCountShow.innerHTML=JSON.parse(localStorage.getItem('Afseem_items')).length
                window.open(res.url, '_blank')
            }
        } catch (error) {
            
        }finally{
            document.querySelector('.loader').style.display='none'
        }
        
        //const jsondata = await datapost.json()
        //console.log(jsondata)

            //if store ends
             }
        }//if datafromlocalstoreage

    })
})

function updatelocastorageafterorder(storeid){
    let updatelocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))
            updatelocalstorage.forEach((stores,index)=>{
                if(stores.storeid==storeid){
                    updatelocalstorage.splice(index,1)
                }
            })

            //saving localstorage
            localStorage.setItem('Afseem_items',JSON.stringify(updatelocalstorage))
}

function UiRender(){
    const allitemscontainer = document.querySelector('.allitemscontainer') 
    const checkoutBtn = document.querySelector('.checkoutbtn')
    const grandtotaldiv = document.querySelector('.grandtotal') 
    const div = document.createElement('div')
    div.className="allitemwrapper";
    let grandtotal=0;
    let htmlcontent=''
    const urlpath =window.location.pathname.split("/"); 
    const id = urlpath[urlpath.length - 1];
    let datafromlocalstorage = JSON.parse(localStorage.getItem('Afseem_items'))||0
    if(datafromlocalstorage.length>0){
    let store = datafromlocalstorage.find( store => store.storeid==id)//store.storeid==id
        let currency = store.products[0].currency;
        if(store){
            store.products.forEach(product=>{
            grandtotal+=(product.productprice*product.productqty)
            htmlcontent+=`
                <div class="singleitem">
                    <div class="checkoutimage">
                        <img src="${product.productimageurl}" alt="">
                    </div>
                    <div class="itemname">
                        <p>Product name</p>
                        <p>${product.productname}</p>
                        <span>SKU: ${product.productsku}</span>
                    </div>
                    <div class="itemqty">Quantity: <span>${product.productqty}</span></div>
                    <div class="itemprice">Price: <span>${product.productprice*product.productqty} ${product.currency}</span></div>
                </div>
            `
        })
        grandtotaldiv.innerHTML=`<span>Grand Total : ${grandtotal} ${currency}</span>`
        }
    }else{
        htmlcontent+='<p>No Product in Checkout!</p>';
        checkoutBtn.style.display="none"
    }
    
    div.innerHTML=htmlcontent;
    allitemscontainer.appendChild(div)
    htmlcontent=''
}