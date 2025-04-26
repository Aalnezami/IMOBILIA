/********* fichier xml ************************ */
let xmlhttp = new XMLHttpRequest();
let sFav = new Set();
let nbPage = 0;
let pageSize = 9;
let startIndex = 0;
let endIndex = 0;
let page = 1;



function loadXMLDoc() {
  xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    initSetFavoritebiens();
    fetchData_2();
  }
};

xmlhttp.open("GET","../data/bdd.xml", true);
xmlhttp.send();
}

// version 2 de la fonction fetchData pour afficher la base de données sous form de cartes
function fetchData_2() {
  let i;
  let xmlDoc = xmlhttp.responseXML;
  // Sélectionnez les éléments <item> du XML
  let items = xmlDoc.querySelectorAll("bien");
  // la div où je veux afficher les cartes
  let cardContainer = document.getElementById("cardContainer");
  nbPage = Math.ceil(items/pageSize);
  startIndex = (page -1) * pageSize; 
  endIndex = startIndex + pageSize;

  // je Parcoure les éléments <item> et je crée une carte pour chaque élément
  for(i = startIndex;i < endIndex; i++){
      let item = items[i];
      let title = item.querySelector("type").textContent;
      let description = item.querySelector("prix").textContent;
      let nombre_piece = item.querySelector("nombre_piece").textContent;
      let img = item.querySelector("img").textContent;
      let id = item.querySelector("ID").textContent;
      let pagelink =("details.html?id="+id);

      // Créez un élément de carte avec les données XML
      let card = document.createElement("div");
      card.classList.add("card");
      if(sFav.has(items[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue)){
        card.innerHTML = `
            <img src="${img}" class="img-thumbnail h-100">
             <a href="${pagelink}" class="link-offset-2 link-underline link-underline-opacity-0">
            <h2>${title}</h2>
            <p>${description}$ - ${nombre_piece}</p></a>
            <p>FAVORIS  <input type="checkbox" checked onclick="setFavorite(event)" value="${id}"></p>
        `;    
        }else{
            card.innerHTML = `
                <img src="${img}" class="img-thumbnail">
                <a href="${pagelink}" class="link-offset-2 link-underline link-underline-opacity-0">
                <h2>${title}</h2>
                <p>${description}$ - ${nombre_piece}</p></a>
                <p>FAVORIS  <input type="checkbox" onclick="setFavorite(event)" value="${id}"></p>
            `;    
        }
      // Ajoutez la carte au conteneur
      cardContainer.appendChild(card);
  }
}

function setFavorite(ev){
  if (ev.currentTarget.checked) {
      console.log("Checked - id :" + ev.currentTarget.value);
      sFav.add(ev.currentTarget.value)        
  } else {
      console.log("Unchecked - id :" + ev.currentTarget.value); 
      sFav.delete(ev.currentTarget.value)         
  }
  
  console.log(sFav);
  let fchaine = Array.from(sFav).join(',')
  favorites :localStorage.setItem("favorites",fchaine)

}

function initSetFavoritebiens(){
  if (localStorage.getItem("favorites") != null){
      let favs = localStorage.getItem("favorites");
      let myArr = favs.split(",");
      for (let i = 0; i < myArr.length; i++) {
          sFav.add(myArr[i]);
      }    
  } 
  
}

function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    //Appeler la fonction fetchData
    fetchData_2(); 
}   

function showPageLinks() {
    let divpl = document.getElementById("pagination");
    divpl.style.display = "block";
    let pageLinks =" ";
    nbPage = Math.ceil(60/pageSize);
    
    for(let i = 1; i <= nbPage; i++){
        pageLinks += "<button class='btn btn-primary' onclick='loadPage(" + i + ")'>" + i + "</button>" + " ";
    }
    divpl.innerHTML = pageLinks;
}
loadXMLDoc();
showPageLinks();

let searchinput = document.getElementById("searchinput");

searchinput.addEventListener("input",(e) =>{
  let letters = e.currentTarget.value;
  let cards = document.querySelectorAll(".card");
  filterElements(letters,cards);
});

function filterElements(letters,element){
  if(letters.length > 2){
    for(let i = 0; i < element.length;i++){
      if(element[i].textContent.tolowerCase().includes(letters)){
        element[i].style.display = "block"
      }else{
        element[i].style.display = "none"
      }
    }
  }
}

