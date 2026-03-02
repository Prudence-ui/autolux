/* =========================
   AUTOLUX SCROLL REVEAL FIX
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("active");
            }
        });
    },{
        threshold:0.15
    });

    reveals.forEach(el => observer.observe(el));

});

/* =========================
   SOCIAL STAGGER ANIMATION
========================= */

const socialItems = document.querySelectorAll(".reveal-item");

const socialObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){

            const delay = entry.target.dataset.delay || 0;

            setTimeout(()=>{
                entry.target.classList.add("active");
            }, delay);

        }
    });
},{threshold:0.2});

socialItems.forEach(el=>socialObserver.observe(el));


/* =========================
   LEFT REVEAL AUTOLUX
========================= */

const leftItems = document.querySelectorAll(".reveal-left");

const leftObserver = new IntersectionObserver(entries => {
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{threshold:0.2});

leftItems.forEach(el=>leftObserver.observe(el));