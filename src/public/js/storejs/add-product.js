window.addEventListener('DOMContentLoaded',()=>{
    const grocery = ["Fruits & Vegetables",
            "Dairy & Eggs",
            "Meat & Poultry",
           "Fish & Seafood",
            "Grains & Breads",
            "Caned & Jarred Goods",
            "Frozen Foods",
            "Herbs & Spices",
            "Snacks & Chips",
            "Cookies and Biscuits",
            "Chocolates & Candies",
            "Nuts & Seeds",
            "Water & Beverages",
            "Bread & Baking Ingredients",
            "Noodles & Pasta",
            "Hygiene & Personal Care",
            "Organic Foods",
            "Household Supplies",
            "Health & Wellness",
            "Detergents & Cleaning Products",
            "Baby Care",
            "Pet Foods & Accessories",
            "Pulse, Rice & Cooking Oil",
            "Coffee & Tea",
            "Stationary",
            "Prepaid Cards",
            "International Specialty"];
    const restaurent = [
                "Soups",
                "Salads",
                "Bread",
                "Main Courses",
                "Grilled/BBQ",
                "Pasta & Noodles",
                "Rice Dishes",
                "Burgers & Sandwiches",
                "Broasted",
                "Pizza & Flatbreads",
                "Seafood",
                "Meat & Poultry",
                "Vegetarian & Vegan",
                "Indian Dishes",
                "Middle Eastern Dishes",
                "Breakfast / Brunch",
                "Desserts",
                "Beverages",
                "Milkshakes & Specialty Drinks"
                ];
    let options;
    //checkCategory
    const checkcategory = document.querySelector('#checkcategory')
    const input = document.querySelector("#subcategory");
    const dropdown = document.getElementById("dropdown");
    const submitbtnaddmore = document.querySelector('#submitbtnaddmore')
    if(checkcategory.value=="grocery"){
            options=[...grocery]
        }else if(checkcategory.value=="restaurant"){
            options=[...restaurent]
        }else{
            options=[]
        }

        //console.log(options)

    //getting value of add another product to true
    if(submitbtnaddmore){
        submitbtnaddmore.addEventListener('click',()=>{
            document.querySelector('#addproductbehaviour').value=true
        })

    }



        //dropdown showing code here
   input.addEventListener("focus", function () {
        showDropdown()
        
    }); 

    input.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        dropdown.innerHTML = "";
        if (value) {
            const filtered = options.filter(option => option.toLowerCase().includes(value));
            if (filtered.length) {
                dropdown.style.display = "block";
                filtered.forEach(option => {
                    const div = document.createElement("div");
                    div.textContent = option;
                    div.addEventListener("click", function () {
                        input.value = option;
                        dropdown.style.display = "none";
                    });
                    dropdown.appendChild(div);
                });
            } else {
                dropdown.innerHTML = "No Category Found with this name";
            }
        } else{
            showDropdown()
        }
    });


    //showing dropdown
    function showDropdown(){
        dropdown.innerHTML = "";
        dropdown.style.display = "block";
        
        options.forEach(option => {
            const div = document.createElement("div");
            div.textContent = option;
            div.addEventListener("click", function () {
                input.value = option;
                dropdown.style.display = "none";
            });
            dropdown.appendChild(div);
        });
    }


    // Hide dropdown when clicking outside
    document.addEventListener("click", function (e) {
        if (!e.target.closest(".dropdown-subcategory")) {
            dropdown.style.display = "none";
        }
    });


      //number input validation
    let inputs = document.querySelectorAll('input[type="number"]')
        inputs.forEach((input)=>{
        input.addEventListener('input',(e)=>{
            let value = parseInt(e.target.value)
            if(value<=0){
                alert('Price must be greater than 0!')
                e.target.value=''
            }
        })
    })


    const uploadInput = document.getElementById('productimage');
    const takephoto = document.querySelector("#takephoto")
    const fileName = document.getElementById('productUploadimage');
    const takephotofile = document.querySelector("#takephotofile")
    const imageuploadingtext = document.querySelector(".imageuploadingtext")
    const takephototext = document.querySelector('.takephototext')

    uploadInput.addEventListener('change', () => {
        if(uploadInput.files.length > 0) {
        fileName.textContent = uploadInput.files[0].name;
        imageuploadingtext.style.display="block"
        takephotofile.textContent = "No file selected";
        takephototext.style.display="none"
        if(takephoto.files.length>0){
            takephoto.value=''
        }
        } else {
        fileName.textContent = "No file selected";
         imageuploadingtext.style.display="none"
        }
    });
    takephoto.addEventListener('change', () => {
        if(takephoto.files.length > 0) {
        takephotofile.textContent = takephoto.files[0].name;
        takephototext.style.display="block"
        fileName.textContent = "No file selected";
         imageuploadingtext.style.display="none"
        if(uploadInput.files.length>0){
            uploadInput.value=''
        }
        } else {
         takephotofile.textContent = "No file selected";
         takephototext.style.display="none"
        }
    });
    
})

