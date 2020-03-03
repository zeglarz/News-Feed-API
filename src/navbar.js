let countries = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'.split(
    ' '
);
let categories = 'Business Entertainment General Health Science Sport Technology'.split(
    ' '
);


let navbar = `

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">Newsify</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
    <a class="nav-link fas fa-home" href="#" onclick="resetNewsPage()"> <span class="sr-only">(current)</span></a>
</li>
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle category" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Categories
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    ${categories.map(
    category => `
    <button onclick="changeCategory('${category}')" value="${category}" class="dropdown-item">${category}
            
        </button>
    `
).join('')}
 
<div class="dropdown-divider"></div>
    <button onclick="changeCategory('All')" class="dropdown-item">All</button>
</div>
</li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle languages" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Languages
        </a>
        
    <div class="dropdown-menu" aria-labelledby="navbarDropdown" >
    
        ${countries
    .map(
        country =>
            `
        <button onclick="changeCountry('${country}')" value="${country}" class="dropdown-item text-center">${country.toUpperCase()}
             <img class="d-inline" src="svg/${country.toUpperCase()}.svg" />
        </button>
    `
    )
    .join('')}

    </li>

    </ul>
    <form class="form-inline my-2 my-lg-0 query-form" method="GET" action="${HOST_URL}/query">
    <input id="q" class="form-control mr-sm-2" type="text" placeholder="Search for your topic..." name="query" aria-label="Search"/>
    <i id="eraseSearch" class="fas fa-times-circle"></i>
    <button type="submit" id="query-btn" onClick="querySearch(query.value);" class="btn btn-outline-success my-2 my-sm-0 query-btn" >Search</button>
    </form>
    </div>
    </nav>`;

document.querySelector('header').innerHTML = navbar;
