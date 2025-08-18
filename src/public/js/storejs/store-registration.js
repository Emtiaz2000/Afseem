
window.addEventListener('DOMContentLoaded',()=>{
  const passwordField = document.querySelector('#storepassword');
  const submitBtn = document.querySelector('.submitBTN')
// Prevent Enter key from submitting form
  document.getElementById("storeForm").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });


  const passwordEye = document.querySelector('.eyespass');
  
  let passCondition = document.querySelector('.passCondition')
  let showPass= false
  passwordEye.addEventListener("click", function () {
      if(!showPass){
        passwordField.type='text';
        showPass=true;
      }else{
        passwordField.type='password';
        showPass=false;
      }
  });

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
})


  