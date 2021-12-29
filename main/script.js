import {quotes} from './quotes.js';
console.log(quotes)
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');
const highScore = document.getElementById('high-score');

try {
  	highScore.innerText = localStorage.getItem('high-score')
} catch(e) {
	localStorage.setItem('high-score', 0)
	highScore.innerText = 0
}
document.getElementById('start').addEventListener('click', () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  words = quote.split(' ');
  wordIndex = 0;

  const spanWords = words.map(function(word) { return `<span>${word} </span>`});
  quoteElement.innerHTML = spanWords.join('');
  quoteElement.childNodes[0].className = 'highlight';
  messageElement.innerText = '';

  typedValueElement.value = '';
  typedValueElement.focus();
  startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', () => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
	const wpm = (quoteElement.childNodes.length * (1000 / elapsedTime * 60)).toFixed(2);
    const message = `Score: ${wpm} WPM`;
    messageElement.innerText = message;
	typedValueElement.value = '';
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
	
	if (localStorage.getItem('high-score') < wpm){
		localStorage.setItem('high-score', wpm)
		highScore.innerText = wpm
	}
  } else if (typedValue.endsWith(' ') && typedValue === currentWord + ' ') {
    typedValueElement.value = '';
    wordIndex++;
	quoteElement.childNodes[wordIndex - 1].className = 'green';
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.className = 'typed-value';
  } else {
    typedValueElement.className = 'error';
  }
});