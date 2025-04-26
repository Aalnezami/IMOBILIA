/********* fichier xml ************************ */
let xmlhttp = new XMLHttpRequest();

let nbPage = 0;
let pageSize = 10;
let startIndex = 0;
let endIndex = 0;
let page = 1;


 function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        fetchData();
    }
 };
 xmlhttp.open("GET","../data/bdd.xml", true);
 xmlhttp.send();
 }


 function fetchData() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = document.getElementById("data")
    table = "<tr><th>TYPE</th><th>PRIX</th><th>NOMBRE DE PIECES</th><th>SURFACE</th><th>Modif</th><th>Sup</th></tr>"; 
    let x = xmlDoc.getElementsByTagName("bien");
    //Calculer nbPage
    nbPage = Math.ceil(((x)/pageSize));    

    //Calculer startIndex et endIndex 
    startIndex = (page -1) * pageSize; 
    endIndex = startIndex + pageSize;  

    //Mettre à jour la boucle en tenant compte startIndex et endIndex
    for (i = startIndex; i < endIndex; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("nombre_piece")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("surface")[0].childNodes[0].nodeValue +
        "</td>" +
        "<td><button type=\"button\" class=\"btn btn-warning\" onclick=\"editBien(" +
        x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue + ")\">" +
        "Modifier</button></td>" +
        "<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteBien(" +
        x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue + ")\">" +
        "Supprimer</button></td>" +                
        "</tr>";
        
    }
    document.getElementById("data").innerHTML = table;
}

function editBien(id) {
    let xmlDoc = xmlhttp.responseXML;
    let biens = xmlDoc.getElementsByTagName("bien");
    let bien;
    let hId = document.getElementById("hId");

    let tblbien = document.getElementById("formAjaoutBien");
    let txtType = document.getElementById("typeBien");
    let txtPrix = document.getElementById("prixBien");
    let txtNb_Pieces = document.getElementById("nb_Piece_Bien");
    let txtSurface = document.getElementById("surfaceBien");
    
    for (i = 0; i < biens.length; i++) {
        if (biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
            bien = biens[i];
        }
    }

    tblbien.style.display = "block";
    hId.value = bien.getElementsByTagName("ID")[0].childNodes[0].nodeValue;
    txtType.value = bien.getElementsByTagName("type")[0].childNodes[0].nodeValue;
    txtNb_Pieces.value = bien.getElementsByTagName("nombre_piece")[0].childNodes[0].nodeValue;
    txtSurface.value = bien.getElementsByTagName("surface")[0].childNodes[0].nodeValue;
    txtPrix.value = bien.getElementsByTagName("prix")[0].childNodes[0].nodeValue;
    
}

function updateBien() {
    let xmlDoc = xmlhttp.responseXML;
    let biens = xmlDoc.getElementsByTagName("bien");
    let bien;
    let id = document.getElementById("hId").value;
    
    for (i = 0; i < biens.length; i++) {
        if (biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
            bien = biens[i];
        }
    }

    let txtType = document.getElementById("typeBien");
    let txtPrix = document.getElementById("prixBien");
    let txtNb_Pieces = document.getElementById("nb_Piece_Bien");
    let txtSurface = document.getElementById("surfaceBien");

    bien.getElementsByTagName("type")[0].childNodes[0].nodeValue = txtType.value;
    bien.getElementsByTagName("prix")[0].childNodes[0].nodeValue = txtPrix.value;
    bien.getElementsByTagName("nombre_piece")[0].childNodes[0].nodeValue = txtNb_Pieces.value;
    bien.getElementsByTagName("surface")[0].childNodes[0].nodeValue = txtSurface.value;
    fetchData();
}

// la fonction deleteBien pour supprimer un bien en passant son id en paramètres
function deleteBien(id) {
    let xmlDoc = xmlhttp.responseXML;
    let biens = xmlDoc.getElementsByTagName("bien");
    let bien;

    for (i = 0; i < biens.length; i++) {
        if(biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == id) {
            bien = biens[i];
        }
    }
    
    xmlDoc.documentElement.removeChild(bien);
    fetchData();
}

function ajoutBien() {
    // récupérer les données du nouveau bien a ajouter 
    let txtType = document.getElementById("typeBien").value;
    let txtPrix = document.getElementById("prixBien").value;
    let txtNb_Pieces = document.getElementById("nb_Piece_Bien").value;
    let txtSurface = document.getElementById("surfaceBien").value;

    let xmlDoc = xmlhttp.responseXML;
    // Créer un élément bien
    let bien_N = xmlDoc.createElement("bien");
    let id = bien_N.length + 1;
    let id_bien_N = xmlDoc.createElement("ID");
    let txtid_bien_N = xmlDoc.createTextNode(id);

    // Créer un élément typeBien
    let type_bien_N = xmlDoc.createElement("type");
    let txt_type_bien_N = xmlDoc.createTextNode(txtType);

    // Créer un élément prixBien
    let prix_bien_N = xmlDoc.createElement("prix");
    let txt_prix_bien_N = xmlDoc.createTextNode(txtPrix);

    // Créer un élément nb_chambre_bien
    let nb_chombre_bien_N = xmlDoc.createElement("nombre_piece");
    let txt_nb_chombre_bien_N = xmlDoc.createTextNode(txtNb_Pieces);

    // Créer un élément surfaceBien
    let surface_bien_N = xmlDoc.createElement("surface");
    let txt_surface_bien_N = xmlDoc.createTextNode(txtSurface);

    // ajouter les données au nouveau bien
    id_bien_N.appendChild(txtid_bien_N);
    type_bien_N.appendChild(txt_type_bien_N);
    prix_bien_N.appendChild(txt_prix_bien_N);
    nb_chombre_bien_N.appendChild(txt_nb_chombre_bien_N);
    surface_bien_N.appendChild(txt_surface_bien_N);
    bien_N.appendChild(id_bien_N);
    bien_N.appendChild(type_bien_N);
    bien_N.appendChild(prix_bien_N);
    bien_N.appendChild(nb_chombre_bien_N);
    bien_N.appendChild(surface_bien_N);

    // ajouter l'element bien_n au fichier xml 
    xmlDoc.documentElement.appendChild(bien_N)
    fetchData();
}

// cette fonction sert a afficher et cacher le formulaire de modification ou ajout d'un bien
function showform(){
    let form = document.getElementById("formAjaoutBien");
    form.style.display ="block";
}

function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    //Appeler la fonction fetchData
    fetchData(); 
}   

function showPageLinks() {
    let divpl = document.getElementById("pagination");
    divpl.style.display = "block";
    let pageLinks =" ";
    //Calculer nbPage
    //nbPage = (xmlhttp.responseXML.getElementsByTagName("bien").length)/pageSize
    nbPage = 60/pageSize;
    
    for(let i = 1; i <= nbPage; i++){
        pageLinks += "<button class='btn btn-primary' onclick='loadPage(" + i + ")'>" + i + "</button>" + " ";
    }
    divpl.innerHTML = pageLinks;
    
}
loadXMLDoc();
showPageLinks();

/*****************  filtrage , tri recherche */
function fetchDataR(i) {
    let xmlDoc = xmlhttp.responseXML;
    let table = document.getElementById("data")
    table = "<tr><th>TYPE</th><th>PRIX</th><th>NOMBRE DE PIECES</th><th>SURFACE</th><th>Modif</th><th>Sup</th></tr>"; 
    let x = xmlDoc.getElementsByTagName("bien");
    //Calculer nbPage
    nbPage = Math.ceil(((x)/pageSize));    

    //Calculer startIndex et endIndex 
    startIndex = (page -1) * pageSize; 
    endIndex = startIndex + pageSize;  

    //Mettre à jour la boucle en tenant compte startIndex et endIndex
    table += "<tr><td>" +
    x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("prix")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("nombre_piece")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("surface")[0].childNodes[0].nodeValue +
    "</td>" +
    "<td><button type=\"button\" class=\"btn btn-warning\" onclick=\"editBien(" +
    x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue + ")\">" +
    "Modifier</button></td>" +
    "<td><button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteBien(" +
    x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue + ")\">" +
    "Supprimer</button></td>" +                
    "</tr>";
    document.getElementById("data").innerHTML = table;
}


function recherche_type(){
    let v_recherche_type = document.getElementById("recherche_type").value
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = document.getElementById("data")
    let x = xmlDoc.getElementsByTagName("bien");

    for(i =0; i < x.length ;i++){
        if(x[i].getElementsByTagName("type") == v_recherche_type){
            fetchDataR(i)
        }
    }


}