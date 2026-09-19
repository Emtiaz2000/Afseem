window.addEventListener('DOMContentLoaded',()=>{
 
    //showing filter option on master data page
        let filterIcon = document.querySelector('.showsubcategoryoption')
        filterIcon.addEventListener('click',()=>{
            document.querySelector('.subcategories').style.display="block";
            
        })
   // Hide dropdown when clicking outside
       document.addEventListener("click", function (e) {
           if (!e.target.closest(".showsubcategoryoption") && !e.target.closest(".subcategories")) {
                document.querySelector('.subcategories').style.display = "none";
           }
       });
 

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