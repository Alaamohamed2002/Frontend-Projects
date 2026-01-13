
let index = 0;
let direction = 1; // forward =1 ,backward = -1

function showSlide ()
{
    const slider = document.querySelector( ".testmonial .container" );
    slider.style.transform = `translateX(${ -index * 100 }%)`;
    console.log( slider )
    console.log(index)
}

function autoSlide ()
{
    const slides = document.querySelectorAll( ".testmonial .box" );
    index+=direction;
    if ( index >= slides.length - 1 ) direction = -1;
    if ( index <= 0 ) direction = 1;
    console.log( index );
    showSlide();
}

setInterval(autoSlide,5000)
