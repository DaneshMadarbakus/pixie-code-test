console.log('working');

var CardGame = CardGame || {};

// START GAME & DEFINE FUNCTIONS TO CREATE DECK OF CARDS
CardGame.go = function(){
  this.card = function(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
  };
  this.deck = function () {
    this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
    var cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
      for( var n = 0; n < this.names.length; n++ ) {
        cards.push( new this.card( n+1, this.names[n], this.suits[s] ) );
      }
    }
    return cards;
  };
  $('.start').on('click', this.setup.bind(this));
};

//ASSIGN NUMBER OF PLAYERS AND CARDS PLAYED IN GAME & REFRESH THE DECK OF CARDS/WINNER HTML
CardGame.setup = function(){
  this.numberOfPlayers = $('.numberOfPlayers').val();
  this.numberOfCards = $('.numberOfCards').val();
  this.cards = [];
  this.cards = this.deck();
  $('.winner').empty();
  this.checkValues();
};

//CHECK NUMBER OF CARDS AND PLAYERS IS APPROPRIATE
CardGame.checkValues = function (){
  if (!this.numberOfPlayers || !this.numberOfCards || this.numberOfPlayers <= 1 || this.numberOfCards <= 0){
    alert('You must have more than one player in the game and at least one card being dealt, please adjust and start again');
  } else if ((this.numberOfPlayers * this.numberOfCards) > 52 && this.numberOfPlayers > this.numberOfCards) {
    alert('You have too many players, please adjust and start again');
  } else if ((this.numberOfPlayers * this.numberOfCards) > 52 && this.numberOfPlayers < this.numberOfCards) {
    alert('You have too many cards, please adjust and start again');
  } else {
    this.createPlayers();
  }
};

//CREATE PLAYERS 
CardGame.createPlayers = function() {
  this.player = function(name){
    this.name = name;
    this.hand = [];
    this.score = 0;
  };
  this.players = [];
  for (var i = 0; i < this.numberOfPlayers; i++) {
    this.players.push(new this.player('player ' + [i + 1]));
  }
  this.deal();
};

//DEAL CARDS TO PLAYERS & ADD UP VALUES OF CARDS AS THEY ARE DEALT
CardGame.deal = function(){
  for (var y = 0; y < this.numberOfPlayers; y++) {
    for (var n = 0; n < this.numberOfCards; n++) {
      this.cardy = this.cards.splice([Math.floor(Math.random() * this.cards.length)], 1);
      this.players[y].hand.push(this.cardy);
      this.players[y].score = this.players[y].score + this.cardy[0].value;
    }
  }
  this.calculateWinner(); 
};

//ARRANGE PLAYERS SO THAT PLAYER WITH HIGHEST SCORE IS PLACED AT THE FRONT OF THE ARRAY
CardGame.calculateWinner = function() {
  for (var w = 1; w < this.numberOfPlayers; w++) {
    if (this.players[0].score > this.players[1].score) {
      this.players.splice(1, 1);
    }  else if (this.players[0].score < this.players[1].score){
      this.players.splice(0, 1);
    } else if (this.players[0].score === this.players[1].score){
      this.players.push(this.players.shift());
    }
  }
  if (this.players.length >=2) {
    for (var h = 1; h < this.players.length; h++) {
      if (this.players[0].score > this.players[1].score) { 
        this.players.splice(1, 1);
      }  else if (this.players[0].score < this.players[1].score){
        this.players.splice(0, 1);
      } else if (this.players[0].score === this.players[1].score){
        this.players.push(this.players.shift());
      }
    }
  } 
  this.showWinner();
};

//PRESENT THE WINNER TO USER
CardGame.showWinner = function() {
  for (var j = 0; j < this.players.length; j++) {
    if (this.players[j].score === this.players[0].score){
      $('.winner').append('<p>' + this.players[j].name + ' wins with a score of ' + this.players[j].score + '!' + '</p>' + '<br>');
    }
  }
};

$(CardGame.go.bind(CardGame));