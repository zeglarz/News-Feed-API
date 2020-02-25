//import './style.scss';
$(document).ready(function () {
    $('#eraseSearch').hide();

    $('.query-form').click(function (e) {
        e.preventDefault();
        return false;
    });
    $('#eraseSearch').click(function () {
        querySearch('');
        $('#q').val('');
        $('#eraseSearch').hide();
        $('#query-btn').css({'margin-left': '0px'});


    });

    $('#q').keyup(function () {
        let val = $(this).val();
        console.log(val);

        if (val.length > 2) {
            $('#eraseSearch').show();
            $('#query-btn').css({'margin-left': '17px'});
        } else {
            $('#eraseSearch').hide();
            $('#query-btn').css({'margin-left': '0px'});

        }
        querySearch(val);

    });
});


const newsCard = ({title, urlToImage, description, url}) =>
    `<div class="row col-lg-2 col-md-6 col-sm-12">
  <div class="card" style="width: 16em; margin-bottom: 15px">
    <img src="${urlToImage}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
    <button onclick="loadArticle('${encodeURIComponent(title).split('\'').join('')}')" class="btn btn-outline-success">Read More</button>
        <a href="${url}" target="_blank" class="btn btn-outline-danger">Go to the source</a>

    </div>
   </div>
  </div>
    `;

function loadArticle(title) {
    Api.getArticle(title)
        .catch((error) => {
            document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">BŁĄD</h1>
  <h2 class="text-center">${error.message}</h2>
  `;
            throw error;
        })
        .then((response) => {
            const {title, urlToImage, content, url} = response;
            const articleContainer = `
    <button onclick="changeCountry(currentState.country); changeCategory(currentState.category)">Go Back</button>

<div class="container-fluid card-deck">
        <h1 class="text-center">${title}</h1>
         <img src="${urlToImage}" class="card-img-top" alt="...">
                 <p>${content}</p>
                         <a href="${url}" target="_blank" class="btn btn-secondary">Go to the source</a>
        </div>`;
            document.querySelector('main').innerHTML = articleContainer;

        });
}


function loadNewsPage() {
    $('.category p:last-child').remove();
    $('.languages img:last-child').remove();

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
            const newsContainer = `
                <div class="container-fluid card-deck justify-content-center">
                        ${response.map((news) => newsCard(news)).join('')}
                </div>`;

            document.querySelector('main').innerHTML = newsContainer;

        });

};

loadNewsPage();

function changeCountry(country) {
    $('.languages img:last-child').remove();
    $('.languages').append(`<img class="d-inline" src="svg/${country.toUpperCase()}.svg" /> `);
    currentState.country = country;
    Api.getNewsByCountry(country)
        .catch((error) => {
            document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">BŁĄD</h1>
  <h2 class="text-center">${error.message}</h2>
  `;
            throw error;
        })
        .then((response) => {
            console.log(response);
            const newsContainer = `
                  <div class="container-fluid card-deck justify-content-center">
                        ${response.map((news) => newsCard(news)).join('')}
                </div>`;

            document.querySelector('main').innerHTML = newsContainer;

        });

}

function changeCategory(category) {
    $('.category p:last-child').remove();
    $('.category').append(`<p class="d-inline">: ${category}</p> `);
    currentState.category = category;
    Api.getNewsByCategory(category)
        .catch((error) => {
            document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">BŁĄD</h1>
  <h2 class="text-center">${error.message}</h2>
  `;
            throw error;
        })
        .then((response) => {
            console.log(response);
            const newsContainer = `
                   <div class="container-fluid card-deck justify-content-center">
                        ${response.map((news) => newsCard(news)).join('')}
                </div>`;

            document.querySelector('main').innerHTML = newsContainer;

        });

}

function querySearch(query) {
    Api.getNewsByQuery(query)
        .catch((error) => {
            document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">BŁĄD</h1>
  <h2 class="text-center">${error.message}</h2>
  `;
            throw error;
        })
        .then((response) => {
            console.log(response);
            if (response.length === 0) {
                document.querySelector('main').innerHTML = `
  <h1 class="text-center" style="color: red">No content to present</h1>
    <h2 class="text-center">Change your searching criteria</h2>

  `;
            } else {
                const newsContainer = `
                   <div class="container-fluid card-deck justify-content-center">
                        ${response.map((news) => newsCard(news)).join('')}
                </div>`;

                document.querySelector('main').innerHTML = newsContainer;
            }
        });

}