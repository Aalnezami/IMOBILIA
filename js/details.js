
let xmlhttp = new XMLHttpRequest();

function loadXMLDocAndDisplaybien(){       
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            displaybienById();
        }
    };
    xmlhttp.open("GET", "data/bdd.xml", true);
    xmlhttp.send();    
}

function displaybienById() {   

    let i; 
    let xmlDoc = xmlhttp.responseXML;           
    let x = xmlhttp.responseXML.getElementsByTagName("bien")
    let item;

    //Récupérer bienId  dans la chaîne de requête
    //let bienid = xmlDoc.querySelector("ID").value;
    let urlparams = new
    URLSearchParams(window.location.search);
    let bienid = urlparams.get("id");
    let cardContainer = document.getElementById("cardContainer");

    item = x[bienid - 1];
        let title = item.querySelector("type").textContent;
        let etat_bien = item.querySelector("etat_actuel").textContent;
        let prix = item.querySelector("prix").textContent;
        let description = item.querySelector("description").textContent;
        let nombre_piece = item.querySelector("nombre_piece").textContent;
        let localisation = item.querySelector("localisation").textContent;
        let img = item.querySelector("img").textContent;
        
            
        // Créez un élément de carte avec les données XML
        let card = document.createElement("div");
        card.innerHTML = `

        <div class="card mb-2" style="max-width: 1000px">
            <div class="row g-0">
                <div class="col-md-5">
                <h1 class="text-center" style="margin-top: 30px;">${title}</h1>
                <h3 class="text-center">${etat_bien} </h3>
                <h3 class="text-center">${nombre_piece}</h3>
                <h2 class="text-center"><font color="red"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg></font>${localisation}</h2>
                <h1 class="text-center"><font color="red">${prix}</font>€</h1>
                </div>
                
                <div class="col-md-7">
                    <div class="card-body">
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${img}" class="d-block w-100" alt="...">
                            </div>
                        <div class="carousel-item">
                            <img src="${img}" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="${img}" class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
        <p class="paragraphe">${description} </p>
            
            `;
        cardContainer.appendChild(card);
}
loadXMLDocAndDisplaybien();

