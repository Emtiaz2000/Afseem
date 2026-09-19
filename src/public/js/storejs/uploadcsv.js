const evtSource = new EventSource("/product-upload-progress");
const loaderSection = document.querySelector('.uploadprogresscontainer')
const form = document.querySelector('.uploadform')
form.addEventListener('submit',()=>{
  loaderSection.style.display="block"
})
evtSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  
  console.log("Progress:", data.percentage + "%");
  document.getElementById("progress-bar").style.width = data.percentage + "%";
  document.getElementById("progress-text").innerText = `${data.completed} / ${data.total}`;
};