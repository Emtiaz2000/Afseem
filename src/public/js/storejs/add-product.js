window.addEventListener('DOMContentLoaded',()=>{
    const options = ["Fruits & Vegetables",
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
    const input = document.querySelector("#subcategory");
    const dropdown = document.getElementById("dropdown");
    const submitbtnaddmore = document.querySelector('#submitbtnaddmore')


        //getting value of add another product to true
    submitbtnaddmore.addEventListener('click',()=>{
        document.querySelector('#addproductbehaviour').value=true
    })



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
    
})

