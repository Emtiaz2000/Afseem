const evtSource = new EventSource("/product-upload-progress");

evtSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(data)
  console.log("Progress:", data.percentage + "%");
  document.getElementById("progress-bar").style.width = data.percentage + "%";
  document.getElementById("progress-text").innerText = `${data.completed} / ${data.total}`;
};