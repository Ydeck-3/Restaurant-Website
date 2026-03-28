const slides = document.getElementsByClassName("slider");
if(slides.length > 0) {
    let sliderIndex = 0;
    function slider() {
        for(let i = 0; i < slides.length; i++){
            slides[i].style.display = "none";
        }

        sliderIndex++;
        if(sliderIndex > slides.length){
            sliderIndex = 1;
        }

        slides[sliderIndex - 1].style.display = "block";

        setTimeout(slider, 2000);
    }
    slider();
}

hamburgerBtn = document.getElementById('hamburger-button');
navMenu = document.getElementById('nav-menu');

if(hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}