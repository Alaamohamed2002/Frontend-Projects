document.querySelector( ".day" ).innerHTML = Math.floor( new Date().getDate() );
document.querySelector( ".hours" ).innerHTML = Math.floor( new Date().getHours() );
document.querySelector( ".minutes" ).innerHTML = Math.floor( new Date().getMinutes());
document.querySelector( ".seconde" ).innerHTML = Math.floor( new Date().getSeconds());

let section = document.querySelector( ".ourskills" );
let progressSpans = document.querySelectorAll( ".prog span" );

let statsSection = document.querySelector( ".stats" );
let boxSpans = document.querySelectorAll( ".stats .boxs .box span" );

let started = false;

// console.log( boxSpans );



window.onscroll = function ()
{
    if ( window.scrollY >= section.offsetTop  )
    {
        // console.log( "Reached" );

        progressSpans.forEach( ( span ) =>
        {
            span.style.width = span.dataset.prog;
        } );
    }

    if ( window.scrollY >= statsSection.offsetTop )
    {
        if ( !started )
        {
            boxSpans.forEach( ( num ) => startCount( num ) );
        }
        started = true;
    }

}




function startCount ( el )
{
    let goal = el.dataset.goal;
    console.log(goal)
    let counnter = setInterval( () =>
    {
        el.textContent++;
        if ( el.textContent == goal )
        {
            clearInterval( counnter );
        }
    }, 2000 / goal );
}




