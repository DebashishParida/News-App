const API_KEY = "47ab50eb563247fd90862c173d138839";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("India"));

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardscontainer=document.getElementById('cards-container');
    const newscardtemplate=document.getElementById('template-news-card');

    cardscontainer.innerHTML='';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemplate.content.cloneNode(true);
        filldata(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });
}

function filldata(cardclone,article){
    const newsimg=cardclone.querySelector('#news-img');
    const newstitle=cardclone.querySelector('#news-title');
    const newsSource=cardclone.querySelector('#news-source');
    const newsdesc=cardclone.querySelector('#news-desc');

    newsimg.src=article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;
    newstitle.innerHTML = article.title;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    
    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardclone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url,"_blank");
    })
}
const searchbutton=document.getElementById('search-button');
const searchinput=document.getElementById('news-input');

let curselectednav=null;
function onNavitem(id){
    fetchnews(id);
    const navitem=document.getElementById(id);
    curselectednav?.classList.remove("active");
    curselectednav=navitem;
    curselectednav.classList.add("active");
    searchinput.value="";
}

searchbutton.addEventListener("click",() =>{
    const query=searchinput.value;
    if (!query) return;
    fetchnews(query);
    curselectednav?.classList.remove("active");
   
})

function reload(){
    window.location.reload();
}

    