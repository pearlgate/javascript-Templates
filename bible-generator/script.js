
document.cookie = "safeCookie1=foo; SameSite=Lax";
document.cookie = "safeCookie2=foo";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

const wordText = document.getElementById("word-text");
const wordVerse = document.getElementById("word-verse");
const wordContainer = document.getElementById("word-container");
const loader = document.getElementById("loader");
const newWordBtn = document.getElementById("new-word-btn");
const twitterBtn = document.getElementById("twitter-btn");

let book = "Ephesians";
let chapters = [1,2,3,4,5,6]
let verse ;

function showLoadingSpinner(){
    loader.hidden = false;
    wordContainer.hidden = true;
}

function removeLoadingSpinner(){
    wordContainer.hidden = false;
    loader.hidden = true;
}

function conveyToTwitter(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${wordText.innerText} - ${wordVerse.innerText}`;
    window.open(twitterUrl,'_blank');
}
async function getWord(){
    showLoadingSpinner();
    const chapter = chapters[Math.floor(Math.random()*chapters.length)];
    if(chapter == 1){
         verse = Math.floor(Math.random()*23);
         if(verse == 0) verse = 1;
    }else if(chapter == 2){
         verse = Math.floor(Math.random()*22);
         if(verse == 0) verse = 1;
    }else if(chapter == 3){
         verse = Math.floor(Math.random()*21);
         if(verse == 0) verse = 1;
    }else if(chapter == 4){
         verse = Math.floor(Math.random()*32);
         if(verse == 0) verse = 1;
    }else if(chapter == 5){
         verse = Math.floor(Math.random()*33);
         if(verse == 0) verse = 1;
    }else {
         verse = Math.floor(Math.random()*24);
         if(verse == 0) verse = 1;
    }
    const wordUrl = `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Book=${book}&chapter=${chapter}&Verse=${verse}`;
    try{        
        const response = await fetch(wordUrl, {            
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
                    "x-rapidapi-key": "0a5a82a7fdmsh72dc283d152da9cp1ae13cjsnba5564cedcd1"
                }
        });
        const word = await response.json();
        console.log(word);
        wordText.innerText = word.Output;
        wordVerse.innerText = word.Book + " " + word.Chapter + " : " + word.Verse;
        removeLoadingSpinner();
    }catch(error){
        console.log(error);
    }
}
getWord();

newWordBtn.addEventListener('click',getWord);
twitterBtn.addEventListener('click',conveyToTwitter);
