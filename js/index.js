$(document).ready(function() {
	var keyListener = new window.keypress.Listener(); // initialise the keypress library


	// Function to build object triangle for player 1 or 2
	var triangleMaker = function(player) {
		var self = this;
		this.degree = 0; // variable that store the current position of the triangle
		var animateLeft; // variable to store setInterval so it can be killed later
		var animateRight; // variable to store setInterval so it can be killed later


		// function that create the element that represent the player
		this.createTriangle = function() {
			var className;
			if (player === 1) {
				className = "triangle1";
			}
			else if (player === 2) {
				className = "triangle2";
			}
			$(".gameContainer").append('<div class="triangles '+ className +'"></div>');
		};


		// function that rotate the triangle takes one argument:
		// **cwOrCcw: rotate clock wise or anti clock wise takes "cw" or "acw"
		this.rotate = function(cwOrAcw) {
			
			var anim;
			
			anim = setInterval(function() {
				if(self.degree < 0) {
					self.degree = 359;
				}
				else if (self.degree > 360) {
					self.degree = 1;
				}

				$(".triangle"+player).css({
					WebkitTransform: 'rotate(' + self.degree + 'deg)'
				});

				if (cwOrAcw === "cw") {
					self.degree++;
				}
				else if (cwOrAcw === "acw") {
					self.degree--;
				}

			}, 1);

			if (cwOrAcw === "cw") {
				animateRight = anim;
			}
			else if (cwOrAcw === "acw") {
				animateLeft = anim;
			}

		};


		// Build event listener for the movement keys. "d" & "f" if player1, "j" & "k" if player2
		this.buildControl = function(){
			var leftControl;
			var rightControl;

			if (player === 1 ) {

				leftControl = "left";
				rightControl = "right";
			}
			else if (player === 2 ) {
				leftControl = "d";
				rightControl = "f";
			}
			
			keyListener.register_combo({
				"keys"              : leftControl,
				"prevent_repeat"    : true,
				"on_keydown"        : function(){self.rotate("acw");},
				"on_keyup"          : function(){clearInterval(animateLeft);}
			});

			keyListener.register_combo({
				"keys"              : rightControl,
				"prevent_repeat"    : true,
				"on_keydown"        : function(){self.rotate("cw");},
				"on_keyup"          : function(){clearInterval(animateRight);}
			});

		};

		self.buildControl();
	};

	// End of Function to build object triangle




	// Builder function to create game object
	var gameMaker = function() {
		var self = this;
		this.blockCounter = 0; // Counter so there is no conflict between block ID
		this.nowPlayingInterval = null; // Variable that will store the setInterval that create the blocks
		this.nowPlaying = false; // Variable that determine if the game is currently running
		this.multiPlayer = false;
		this.instance = 1;


		// Makes new block
		this.makeBlock = function(position, blockId) {
			$('.blockContainer').append('<img src="img/blockOrigin.svg" class="block blockPosition' + position + '"" id="block' + blockId + '">');
		};


		// Return an array with the positions for the block to make
		this.createWall = function(){
			var wallArray = [0,0,0,0,0,0];
			var wallFullCounter = 0;
			// fills the position at random
			for (i=0; i<wallArray.length; i++) {

				random = Math.random();
				if (random < 0.66) {
						wallArray[i] = 1;
				}
					 
			}

			// check if the position are all filed if they are make a hole at random
			for(i = 0; i < wallArray.length; i++) {

				if(wallArray[i] === 1) {
					wallFullCounter++;
				}

				if(wallFullCounter >= 6) {
					var wallPick = parseInt(Math.random() * 6);
					wallArray[wallPick] = 0;
				}
			}
			return wallArray;
		};


		// Function to animate the block to the center then remove them, takes two arguments:
		// **blockIndex: the position of the block to make, takes a number from 0 to 5
		// **blockNumber: number to get the ID of the block to animate, takes a number provided earlier by self.blockCounter
		this.animateBlock = function(blockIndex, blockNumber) {
			var thisId = "#block"+blockNumber;
			
			$(thisId).velocity({
				"top": "384px",
				"left": "512px",
				"height": "30px",
				"width": "0"
			},
				3000, function() {
				$(thisId).remove(); //removes created block
			});

		};


		// Function that wait a certain amount of time before checking if the triangle is in the same zone as a block, takes one argument:
		// **blockIndex: the position of the block to check for colision, takes a number from 0 to 5
		this.checkCollision = function(blockIndex) {
			var startPoint= blockIndex * 60; // use the index of the block to determine the start of the surface that block will cover
			var endPoint = startPoint + 60; // use the previous variable to determine the end of the surface that block will cover

			// Closure that keep the current value of self.instance for later
			var rememberInstance = (function(){
				var instance = self.instance;
				return function() {
					return instance;
				};
			})();

			setTimeout(function() {
				var player1Position = player1.degree;
				var player2Position = player2.degree;
				var playerLose = 0;

				if (rememberInstance() === game.instance) {// Check that the timeout function originated in the current game


					if (self.multiPlayer) {// Check if in multiplayer mode 

						if (( (player1.degree >= startPoint) && (player1.degree <= endPoint) ) && (player2.degree >= startPoint) && (player2.degree <= endPoint)) {
							playerLose = 3; // set playerLose to 3 if both player lose
						}

						else if ((player1.degree >= startPoint) && (player1.degree <= endPoint)) {
							playerLose = 1;// set playerLose to 1 if player 1 loses
						}

						else if ((player2.degree >= startPoint) && (player2.degree <= endPoint)) {
							playerLose = 2;// set playerLose to 2 if player 1 loses
						}

					}

					else {
						if ((player1.degree >= startPoint) && (player1.degree <= endPoint)) {
							playerLose = 1;// set playerLose to 1 if player 1 loses
						}
					}

					if (playerLose !== 0) {
						game.instance++;
						self.nowPlaying = false;
						$(".triangles").remove();
						$(".block").remove();
						player1.degree = 0;
						player2.degree = 0;
						clearInterval(self.nowPlayingInterval);

						if (playerLose === 3) {
							$(".instruction").prepend('<h1 class="status">You both lose.</h1>');
						}
						else if (playerLose === 1) {
							$(".instruction").prepend('<h1 class="status">Player 1 loses.</h1>');
						}
						else if (playerLose === 2) {
							$(".instruction").prepend('<h1 class="status">Player 2 loses.</h1>');
						}
						
					}
					

				}

			}, 2350);
		};



		// Function that create the wall and send it, call these functions:
		// self.createWall, self self.makeBlock, self.animateBlock & self.checkCollision
		this.spawnWall = function() {
			var wallArray = self.createWall();

			for (i = 0; i < wallArray.length; i++) {

				if (wallArray[i] === 1) {
					self.blockCounter++;
					var thisBlock = self.blockCounter;

					self.makeBlock(i, thisBlock); // makes the block
					
					self.animateBlock(i, thisBlock); // animate it to the center

					self.checkCollision(i); // check a bit later to see if it it's anything
					
				}
			}
		};


		// function that start the game
		this.start = function() {
			// check that the game is not already launched
			if (!self.nowPlaying) {
				self.nowPlaying = true; // turn on the game is now playing switch

				// start spawning wall every second until it's stopped
				self.nowPlayingInterval = setInterval(function(){
					self.spawnWall();
				}, 1000);
			}
		};


	};
	// end of builder function to creat game object
	
	
	// function that build the interface
	var uiMaker = function() {

	};
	// end of function that build the interface


	// Initialise
	var game = new gameMaker(); // makes the game
	var player1 = new triangleMaker(1); // makes player one
	var player2 = new triangleMaker(2); // makes player two





	// testing
	var testWall = function(){
			var wallArray = [1,1,1,1,1,1];

			for (i = 0; i < wallArray.length; i++) {

				if (wallArray[i] === 1) {
					game.blockCounter++;
					var thisBlock = game.blockCounter;

					game.makeBlock(i, thisBlock);
					
				}
			}
		};

	// testWall();
	keyListener.register_combo({
		"keys"              : "s",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){
			player1.createTriangle();
			$(".status").remove();
			game.multiPlayer = false;
			game.start();
		}
	});

	keyListener.register_combo({
		"keys"              : "q",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){
			player1.createTriangle();
			player2.createTriangle();
			$(".status").remove();
			game.multiPlayer = true;
			game.start();
		}
	});

	keyListener.register_combo({
		"keys"              : "r",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){game.animateBlock(0, 33);}
	});

	keyListener.register_combo({
		"keys"              : "t",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){game.makeBlock(0);}
	});

	keyListener.register_combo({
		"keys"              : "y",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){
			var wallArray = [1,1,1,1,1,1];

			for (i = 0; i < wallArray.length; i++) {

				if (wallArray[i] === 1) {
					game.blockCounter++;
					var thisBlock = game.blockCounter;

					game.makeBlock(i, thisBlock);
					
				}
			}
		}

	});

	

});