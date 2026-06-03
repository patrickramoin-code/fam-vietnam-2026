const jours = [
"23/05/2026 - Arrivée Hanoï",
"24/05/2026",
"25/05/2026",
"26/05/2026",
"27/05/2026",
"28/05/2026",
"29/05/2026",
"30/05/2026",
"31/05/2026",
"01/06/2026",
"02/06/2026",
"03/06/2026",
"04/06/2026 - Retour"
];

const liste = document.getElementById("listeJours");
const zone = document.getElementById("zoneFormulaire");
const rapport = document.getElementById("rapport");

let base = JSON.parse(localStorage.getItem("famVietnam")) || {};

jours.forEach((j,index)=>{
    const div=document.createElement("div");
    div.className="jour";
    div.innerHTML=(index+1)+". "+j;
    div.onclick=()=>ouvrirJour(j);
    liste.appendChild(div);
});

function ouvrirJour(jour){

    const data=base[jour] || {};

    zone.classList.remove("hidden");

    zone.innerHTML=`
    <h2>${jour}</h2>

    <label>Hébergement</label>
    <input id="hebergement" value="${data.hebergement||""}">

    <label>Petit-déjeuner</label>
    <input id="pdj" value="${data.pdj||""}">

    <label>Déjeuner</label>
    <input id="dej" value="${data.dej||""}">

    <label>Dîner</label>
    <input id="din" value="${data.din||""}">

    <label>Visites</label>
    <textarea id="visites">${data.visites||""}</textarea>

    <label>Guide</label>
    <input id="guide" value="${data.guide||""}">

    <label>Chauffeur</label>
    <input id="chauffeur" value="${data.chauffeur||""}">

    <label>Véhicule</label>
    <input id="vehicule" value="${data.vehicule||""}">

    <label>Commentaires</label>
    <textarea id="commentaires">${data.commentaires||""}</textarea>

    <button onclick="sauverJour('${jour}')">Enregistrer la journée</button>
    `;
}

function sauverJour(jour){

    base[jour]={
        hebergement:document.getElementById("hebergement").value,
        pdj:document.getElementById("pdj").value,
        dej:document.getElementById("dej").value,
        din:document.getElementById("din").value,
        visites:document.getElementById("visites").value,
        guide:document.getElementById("guide").value,
        chauffeur:document.getElementById("chauffeur").value,
        vehicule:document.getElementById("vehicule").value,
        commentaires:document.getElementById("commentaires").value
    };

    localStorage.setItem("famVietnam",JSON.stringify(base));

    alert("Journée enregistrée");
}

function sauverInfos(){
    alert("Informations enregistrées");
}

function genererRapport(){

    let html="<h2>Rapport FAM Vietnam 2026</h2>";

    jours.forEach(j=>{

        const d=base[j];

        if(!d) return;

        html+=`
        <hr>
        <h3>${j}</h3>

        <p><b>Hébergement :</b> ${d.hebergement||""}</p>

        <p><b>Petit-déjeuner :</b> ${d.pdj||""}</p>

        <p><b>Déjeuner :</b> ${d.dej||""}</p>

        <p><b>Dîner :</b> ${d.din||""}</p>

        <p><b>Visites :</b><br>${d.visites||""}</p>

        <p><b>Guide :</b> ${d.guide||""}</p>

        <p><b>Chauffeur :</b> ${d.chauffeur||""}</p>

        <p><b>Véhicule :</b> ${d.vehicule||""}</p>

        <p><b>Commentaires :</b><br>${d.commentaires||""}</p>
        `;
    });

    rapport.innerHTML=html;
    rapport.classList.remove("hidden");
}

function effacer(){

    if(confirm("Effacer toutes les données ?")){
        localStorage.removeItem("famVietnam");
        location.reload();
    }
}
