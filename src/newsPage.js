function loadNewsPage() {

    Api.getProducts();

    const newsCard = ({articles.name: name, articles.description: description, articles.urlToImage: imageURL }) =>
        `<div class="card" style="width: 18rem">
    <img src="${imageURL}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${description}</p>
      <button class="btn btn-primary" onclick="Cart.addItem('${id}', '${name}', ${price})">
      dodaj do koszyka
      </button>
    <a href="#/product/${id}" class="btn btn-secondary">Zobacz więcej</a>
    <button class="btn btn btn-danger" onclick="removeProductById('${id}')">
      usuń produkt
      </button>
    </div>
  </div>
    `;

    Api.getNews()

        .catch((error) => {
            document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">BŁĄD</h1>
  <h2 class="text-center">${error.message}</h2>
  `;
            throw error;
        })
        .then((response) => {
            console.log(response);
            const productsListContainer = `
                <div class="container-fluid card-deck">
                        ${response.map((product) => newsCard(product))}
                </div>`;

            document.querySelector("main").innerHTML = productsListContainer;

        })
};
