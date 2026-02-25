 /* ======================
   WAIT UNTIL PAGE READY
====================== */

document.addEventListener("DOMContentLoaded", () => {

/* ======================
   CHECK CARS DATA
====================== */

if (typeof cars === "undefined") {
console.error("Cars data not loaded");
return;
}

/* ======================
   GET CAR ID FROM URL
====================== */

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

const container = document.getElementById("car-detail");

if (!container) return;

const car = cars[carId];

if (!car) {
container.innerHTML = "<h2>Voiture introuvable</h2>";
return;
}

/* ======================
   BUILD SLIDER IMAGES
====================== */

let sliderImages = "";

car.images.forEach((img) => {
sliderImages+=`
<div class="zoom-container">
<img src="${img}" class="slide" loading="lazy">
</div>

`;});

/* ======================
   DEFAULT DATA (si absent)
====================== */

const stats = car.stats || {
year: "2023",
mileage: "25 000 km",
fuel: "Essence",
transmission: "Automatique",
warranty: "12 mois"
};

const description =
car.description ||
".";

/* ======================
   DISPLAY CAR
====================== */

container.innerHTML = `

<div class="car-detail-card">

<div class="premium-slider">

<div class="slides">
${sliderImages}
</div>

<button class="prev">❮</button>
<button class="next">❯</button>

<div class="thumbnails">
${car.images.map((img,i)=>
`<img src="${img}" class="thumb" data-index="${i}">`
).join("")}
</div>

</div>

<div class="car-info-detail">

<h2>${car.name}</h2>

<div class="detail-price">${car.price}</div>

<div class="car-specs">
<p>✔ Année : ${stats.year}</p>
<p>✔ Kilométrage : ${stats.mileage}</p>
<p>✔ Carburant : ${stats.fuel}</p>
<p>✔ Transmission : ${stats.transmission}</p>
<p>✔ Garantie : ${stats.warranty}</p>
</div>

<p class="car-description">
${description}
</p>

<a href="https://wa.me/${car.whatsapp}"
class="btn"
target="_blank">
Contacter le vendeur
</a>

</div>

</div>
`;

/* ======================
   PREMIUM SLIDER
====================== */

let current = 0;

const slides = document.querySelectorAll(".slides .slide");
const thumbs = document.querySelectorAll(".thumb");

function showSlide(index){

slides.forEach((slide,i)=>{
slide.classList.toggle("active", i===index);
});

thumbs.forEach((thumb,i)=>{
thumb.classList.toggle("active", i===index);
});

current=index;
}

/* arrows */

document.querySelector(".next").onclick=()=>{
let next=(current+1)%slides.length;
showSlide(next);
};

document.querySelector(".prev").onclick=()=>{
let prev=(current-1+slides.length)%slides.length;
showSlide(prev);
};

/* thumbnails click */

thumbs.forEach(thumb=>{
thumb.addEventListener("click",()=>{
showSlide(Number(thumb.dataset.index));
});
});


/* init */

showSlide(0);


/* ======================
   ZOOM CURSOR POSITION
====================== */

document.querySelectorAll(".zoom-container")
.forEach(container=>{

const img = container.querySelector("img");

container.addEventListener("mousemove",(e)=>{

const rect = container.getBoundingClientRect();

const x = (e.clientX - rect.left)/rect.width*100;
const y = (e.clientY - rect.top)/rect.height*100;

img.style.transformOrigin = `${x}% ${y}%`;

});

container.addEventListener("mouseleave",()=>{
img.style.transformOrigin="center";
});

});


/* ======================
   MOBILE SWIPE
====================== */

let startX=0;

const slider=document.querySelector(".premium-slider");

slider.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

slider.addEventListener("touchend",e=>{
let endX=e.changedTouches[0].clientX;

if(startX-endX>50){
document.querySelector(".next").click();
}

if(endX-startX>50){
document.querySelector(".prev").click();
}
});

/* ======================
   REAPPLY LANGUAGE
====================== */

const savedLang = localStorage.getItem("lang") || "fr";

if (typeof applyLanguage === "function") {
applyLanguage(savedLang);
}

});