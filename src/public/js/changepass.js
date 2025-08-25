
window.addEventListener('DOMContentLoaded',()=>{
  const passwordField = document.querySelector('#newpassword');
  const confirmpassField = document.querySelector('#confirmPass');
  const submitBtn = document.querySelector('.submitBTN')
  let passCondition = document.querySelector('.passCondition')
// Prevent Enter key from submitting form
  document.getElementById("changepass").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
  
//password checking
  passwordField.addEventListener('keyup',()=>{
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{8,}$/;
    if(passwordRegex.test(passwordField.value)){
      passCondition.style.display="none";
      submitBtn.disabled=false
    }else{
      passCondition.style.display="block"
      submitBtn.disabled=true
    }
  })
   confirmpassField.addEventListener('keyup',()=>{
    if(confirmpassField.value!=passwordField.value){
      submitBtn.disabled=true
    }else{
      submitBtn.disabled=false
    }
  })
})


  