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
            fetchFavoritebiens();        
        }
    };
    xmlhttp.open("GET", "../data/bdd.xml", true);
    xmlhttp.send();
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
    fetchFavoritebiens();
  
}

function fetchFavoritebiens(){
    let i;
    let xmlDoc = xmlhttp.responseXML;    
    let items = xmlDoc.querySelectorAll("bien");
    let cardContainer = document.getElementById("cardContainerFavoris");
    
  
    for (i = 0; i < items.length; i++) {   
        //let idbien = items[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        let item = items[i];
        let title = item.querySelector("type").textContent;
        let description = item.querySelector("prix").textContent;
        let nombre_piece = item.querySelector("nombre_piece").textContent;
        let img = item.querySelector("img").textContent;
        let id = item.querySelector("ID").textContent;
        let pagelink =("../details.html?id="+id); 
        let card = document.createElement("div");    
        if(sFav.has(id))
        { 
            card.classList.add("card");
            card.innerHTML = `
                <img src="${img}" class="img-thumbnail">
                <a href="${pagelink}" class="link-offset-2 link-underline link-underline-opacity-0">
                <h2>${title}</h2>
                <p>${description}$ - ${nombre_piece}</p></a>
                <p>FAVORIS  <input type="checkbox" checked onclick="setFavorite(event)" value="${id}"></p>
            `;   
        }
        cardContainer.appendChild(card); 
        //cardContainer.innerHTML = card;
    }
   
    
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
loadXMLDoc();

