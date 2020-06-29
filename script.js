 const cards = document.querySelectorAll('.memory-card');
  var pontuacao = 0;

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
      
      this.classList.add('flip');
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
   }

   secondCard = this;

   checkForMatch();
 }

 function checkForMatch() {
   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
 isMatch ? disableCards() : unflipCards();
 }

 function disableCards() {
   firstCard.removeEventListener('click', flipCard);
   secondCard.removeEventListener('click', flipCard);
   
   resetBoard();
   pontuar(++pontuacao);
 }

 function unflipCards() {
   lockBoard = true;
 
   setTimeout(() => {
     firstCard.classList.remove('flip');
     secondCard.classList.remove('flip');
     
   resetBoard();
   }, 1000);
   pontuar(--pontuacao);
 }
   
  function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }
 
 (function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 24);
     card.style.order = ramdomPos;
   });
 })();
 
cards.forEach(card => card.addEventListener('click', flipCard));

 localStorage.setItem("record", 0);
 var record = localStorage.getItem("record");
 
 function pontuar(pontos){
    var spanPontuacao = document.getElementById("pontuacao")
    spanPontuacao.innerHTML = pontos
    
    if(pontuacao <= 0){
      pontuacao = 1;
    }
    
    if (pontos > record){
      record = pontos
      localStorage("record", record);
    }
    
    var spanRecord = document.getElementById("record")
    spanRecord.innerHTML = record;

 }
