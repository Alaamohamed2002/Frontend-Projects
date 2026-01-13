const icon = document.querySelector( "header nav .icon" );
const nav = document.querySelector( "header nav " );
const ul = document.querySelector( "header nav  ul" );
const links = document.querySelectorAll( "header nav  ul li a" );
const line = document.querySelector( "header nav  ul .magic-line" );
const upIcon = document.querySelectorAll( ".faq .question .up" );
const downIcon = document.querySelectorAll( ".faq .question .down" );
const answer = document.querySelectorAll( ".faq .answer " );
const questions = document.querySelectorAll( ".faq .question" )
//Mobile Menue
nav.addEventListener( "click", function ()
{
    if ( nav.classList.contains( "mobile" ) )
    {
        nav.classList.remove("mobile")
    } else
    {
        nav.classList.add("mobile")
    }
} );

questions.forEach( ( q ) =>
{
    q.addEventListener( "click", () =>
    {
        const answer = q.nextElementSibling;
        const upIcon = q.querySelector( ".faq .question .up" );
        const downIcon = q.querySelector( ".faq .question .down" );
        answer.classList.toggle( "show" );
        downIcon.classList.toggle( "hide" );
        upIcon.classList.toggle( "show" );
    })
} );

document.querySelector( "footer .year" ).innerHTML = new Date().getFullYear();