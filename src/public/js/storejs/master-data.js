window.addEventListener('DOMContentLoaded',()=>{
    const options = [
            "All",
            "Fruits & Vegetables",
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
    

    //showing filter option on master data page
        let filterIcon = document.querySelector('.filterIcon')
        let closefilter = document.querySelector('.closefilter')
        filterIcon.addEventListener('click',()=>{
            closefilter.style.display='block';
            document.querySelector('#CategorySearch').style.display="block";
            filterIcon.style.display='none';
        })
    //hiding filter in small device
        closefilter.addEventListener('click',()=>{
            filterIcon.style.display='block';
            document.querySelector('#CategorySearch').style.display="none";
            closefilter.style.display='none'
        })
   


    //showing active menu
    function filterActiveToggle(){
        let filtersoption = document.querySelectorAll('.filterOption')
        filtersoption.forEach(filterOption=>{
            filterOption.addEventListener('click',()=>{
                activeClass(filtersoption)
                filterOptionClick(filterOption)
            })
        })
    }
  filterActiveToggle()

//adding active class
  function filterOptionClick(filterOption){
    filterOption.classList.add('active')
  }
  //removing active class
  function activeClass(options){
    options.forEach(option=>{
        option.classList.remove('active')
    })
  }
})