let countries = 'ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za'.split(" ");
const  navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Newsyfy</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
    <a class="nav-link" href="#" onclick="window.location.reload(true);">Home <span class="sr-only">(current)</span></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Categories
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <a class="dropdown-item" href="#">Business</a>
    <a class="dropdown-item" href="#">Entertainment</a>
        <a class="dropdown-item" href="#">Health</a>
    <a class="dropdown-item" href="#">Science</a>
    <a class="dropdown-item" href="#">Sports</a>
    <a class="dropdown-item" href="#">Technology</a>

<div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">All</a>
</div>
</li>
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Languages
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <form action="http://localhost:80/" method="POST" id="countryButton">
    ${countries.map(country => 
    `
<button name="country" value="${country}" class="dropdown-item d-inline text-center">${country}
<img class="d-inline" src="svg/${country}.svg" />
</button> `).join("")}
   </form>

</li>

    </ul>
    <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Search for your topic..." aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
    </form>
    </div>
    </nav>`

document.querySelector("header").innerHTML = navbar;
