const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}

function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
   // console.log(quote);
   // Check if author field is blank and replace it with 'unknown'
   if(!quote.author){
       authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

//  Get Quotes From API
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    }catch(error) {
        // Catch Error Here
    }
}

// On Load
getQuotes();

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl,'_blank');
}

twitterBtn.addEventListener('click',tweetQuote);
newQuoteBtn.addEventListener('click',newQuote);

