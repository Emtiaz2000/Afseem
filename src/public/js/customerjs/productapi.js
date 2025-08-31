let currentPage = 1;
let totalPages = parseInt(document.getElementById('regularProductSection').dataset.productpage);
const regularProductsContainer = document.getElementById('regularProductSection');
const endOfContentContainer = document.getElementById('endofcontent');
const loading = document.getElementById('loading');
const loadMoreBtn = document.getElementById('loadMoreBtn');

loadMoreBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    loadMoreProducts();
  } else {
    showEndOfContent();
  }
});

function loadMoreProducts() {
  currentPage++;
  loading.style.display = 'block';
  loadMoreBtn.disabled = true;

  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('pageRegular', currentPage);

  fetch(`${window.location.pathname}?${urlParams.toString()}`)
    .then(res => res.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const newProducts = doc.getElementById('regularProductSection').innerHTML;

      regularProductsContainer.innerHTML += newProducts;

      loading.style.display = 'none';
      loadMoreBtn.disabled = false;

      if (currentPage >= totalPages) {
        showEndOfContent();
      }
    })
    .catch(err => {
      console.error(err);
      loading.style.display = 'none';
      loadMoreBtn.disabled = false;
    });
}

function showEndOfContent() {
  if (!document.getElementById('endContent')) {
    const endMsg = document.createElement('div');
    endMsg.id = 'endContent';
    endMsg.style.textAlign = 'center';
    endMsg.style.margin = '20px 0';
    endMsg.textContent = '— End of Content —';
    endOfContentContainer.appendChild(endMsg);
    loadMoreBtn.style.display = 'none';
  }
}
