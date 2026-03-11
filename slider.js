var sliderIndex = 0;
slider()

function slider(){
    let slide = document.getElementsByClassName("slider");
    for(let i = 0; i < slide.length; i++){
        slide[i].style.display = "none";
    }
    
    sliderIndex++;
    
    if(sliderIndex > slide.length){
        sliderIndex = 1;
    }

    slide[sliderIndex - 1].style.display = "block";

    setTimeout(slider, 2000);
}