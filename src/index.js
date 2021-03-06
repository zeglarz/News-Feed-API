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
        $('#query-btn').css({ 'margin-left': '0px' });
    });

    $('#q').keyup(function () {
        let val = $(this).val().toLowerCase();
        if (val.length > 0) {
            $('#eraseSearch').show();
            $('#query-btn').css({ 'margin-left': '17px' });
        } else {
            $('#eraseSearch').hide();
            $('#query-btn').css({ 'margin-left': '0px' });
        }
        querySearch(val);
    });
});

window.currentState = {
    country: 'us',
    category: '',
    query: '',
    response: []
};

const newsCard = ({ title, urlToImage, description, url }) =>
    (`
    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div class="card">
            <img src="${urlToImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <button onclick="loadArticle('${escape(title)}')" class="btn btn-outline-success">Read More</button>
                <a href="${url}" target="_blank" class="btn btn-outline-danger">Go to the source</a>
            </div>
        </div>
    </div>
    `);

const newsCardRow = (cards) =>
    (`
     <div class="card-deck">
        ${cards}
     </div>
    `);

const loadArticle = (artTitle) => {
    $('#q').hide();
    let article = currentState.response.find((article) => article.title === unescape(artTitle));
    const { title, urlToImage, content, url } = article;
    document.querySelector('main').innerHTML =
        (`
        <div class="container-fluid card-deck">
            <button onclick="loadArticleWithoutRefresh()">Go Back</button>
            <h1 class="text-center">${title}</h1>
            <img src="${urlToImage}" class="card-img-top" alt="...">
            <p>${content}</p>
            <a href="${url}" target="_blank" class="btn btn-secondary">Go to the source</a>
        </div>
        `);
};

const loadArticleWithoutRefresh = () => {
    $('#q').show();
    const news = currentState.response;
    document.querySelector('main').innerHTML =
        newsCardRow(news.map((news) => newsCard(news)).join(''));
};

const loadNewsPage = () => {
    $('.category p:last-child').remove();
    $('.languages img:last-child').remove();

    fetchNews();

};

const resetNewsPage = () => {
    window.currentState = {
        country: 'us',
        category: '',
        query: '',
        response: []
    };

    $('#q').val('');
    $('#eraseSearch').hide();
    $('#query-btn').css({ 'margin-left': '0px' });

    loadNewsPage();
};

const changeCountry = (country) => {
    $('.languages img:last-child').remove();
    $('.languages').append(`<img class="d-inline" src="svg/${country.toUpperCase()}.svg" /> `);
    currentState.country = country;
    fetchNews();
};

const changeCategory = (category) => {
    $('.category p:last-child').remove();
    $('.category').append(`<p class="d-inline">: ${category}</p> `);
    currentState.category = category.toLowerCase();
    fetchNews();
};

const querySearch = (query) => {
    let searchedTitle = currentState.response.filter(r => {
        if (r.title !== null || '') {
            return r.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(query);
        }
        return false;
    });

    let searchedDescription = currentState.response.filter(r => {
        if (r.description !== null || '') {
            return r.description
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(query);
        }
        return false;
    });

    let concat = [...searchedTitle, ...searchedDescription];
    let set = new Set(concat);
    let joinedResponse = [...set];

    if (joinedResponse.length === 0) {
        document.querySelector('main').innerHTML =
            (`
             <h1 class="text-center" style="color: red">No content to present</h1>
             <h2 class="text-center">Change your searching criteria</h2>
            `);
    } else {
        document.querySelector('main').innerHTML =
            newsCardRow(joinedResponse.map((news) => newsCard(news)).join(''));
    }
};

const fetchNews = () => Api.getNews(currentState.country, currentState.category, currentState.query)
    .catch((error) => {
        document.querySelector('main').innerHTML =
            (`
             <h1 class="text-center" style="color: red">BŁĄD</h1>
             <h2 class="text-center">${error.message}</h2>
            `);
        throw error;
    })
    .then((response) => {
        currentState.response = response;
        document.querySelector('main').innerHTML =
            newsCardRow(response.map((news) => newsCard(news)).join(''));
    });

loadNewsPage();
