import {quotes} from './quotes.js';
console.log(quotes)
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');
const highScore = document.getElementById('high-score');

//set highscore
try {
  	highScore.innerText = localStorage.getItem('high-score')
} catch(e) {
	localStorage.setItem('high-score', 0)
	highScore.innerText = 0
}
// at the end of script.js
document.getElementById('start').addEventListener('click', () => {
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(' ');
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join('');
  // Highlight the first word
  quoteElement.childNodes[0].className = 'highlight';
  // Clear any prior messages
  messageElement.innerText = '';

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = '';
  // set focus
  typedValueElement.focus();
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();

});

// at the end of script.js
typedValueElement.addEventListener('input', () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
	const wpm = (quoteElement.childNodes.length * (1000 / elapsedTime * 60)).toFixed(2);
    const message = `Previous Score: ${wpm} WPM`;
    messageElement.innerText = message;
	typedValueElement.value = '';
	// reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
	
	if (localStorage.getItem('high-score') < wpm){
		localStorage.setItem('high-score', wpm)
		highScore.innerText = wpm
	}
  } else if (typedValue.endsWith(' ') && typedValue === currentWord + ' ') {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    // for (const wordElement of quoteElement.childNodes) {
    //   	wordElement.className = '';
    // }
	
    // highlight the new word
    quoteElement.childNodes[wordIndex - 1].className = 'green';
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = 'typed-value';
  } else {
    // error state
    typedValueElement.className = 'error';
  }
});

function lsTest(){
    var test = 'high-score';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}