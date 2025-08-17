
window.addEventListener('DOMContentLoaded',()=>{
const passwordEye = document.querySelector('.eyespass');
  const passwordField = document.querySelector('#loginuserpass');
  let showPass= false
  passwordEye.addEventListener("click", function () {
      if(!showPass){
        passwordField.type='text';
        showPass=true;
      }else{
        passwordField.type='password';
        showPass=false;
      }
  })
})

