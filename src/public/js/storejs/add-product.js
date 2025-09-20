window.addEventListener('DOMContentLoaded',()=>{
    //checkCategory
    const checkcategory = document.querySelector('#checkcategory')
    const input = document.querySelector("#subcategory");
    const dropdown = document.getElementById("dropdown");
    const submitbtnaddmore = document.querySelector('#submitbtnaddmore')
    const options = document.querySelectorAll('.h_subcategory')
    const nomatch = document.querySelector('.nomatch')

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
        let matchCount = 0
        if(value.trim().length<1){
            nomatch.style.display="none";
        }
        if (value) {  // true if not empty
        options.forEach(option => {
            if (option.textContent.toLowerCase().includes(value)) {
                option.style.display = "block";
                matchCount++
            } else {
                option.style.display = "none";
                
            }
        });
    } else {
        // if input is empty, show all options
        options.forEach(option => {
            option.style.display = "block";
            nomatch.style.display="none";
        });
    }
    //showing no category found
        if(matchCount===0){
             nomatch.style.display="block";
        } else{
             nomatch.style.display="none";
        }
    });


    //showing dropdown
    function showDropdown(){
        nomatch.style.display="none";
        dropdown.style.display = "block";
        options.forEach(option => {
            option.addEventListener("click", function () {
                input.value = option.textContent;
                dropdown.style.display = "none";
            });
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
            if(value<0){
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


/* const filtered = options.filter(option => option.toLowerCase().includes(value));
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
            } */