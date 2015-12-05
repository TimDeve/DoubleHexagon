$(document).ready(function() {
	var keyListener = new window.keypress.Listener();


	// Function to build object triangle for player 1 or 2
	var triangleMaker = function(player) {
		var self = this;
		this.el = $(".triangle"+player);
		this.degree = 0;
		var animateLeft;
		var animateRight;

		// Rotate triangle 
		// cwOrCcw: rotate clock wise or anti clock wise takes "cw" or "acw"
		this.rotate = function(cwOrAcw) {
			
			var anim;
			
			anim = setInterval(function() {
				if(self.degree < 0) {
					self.degree = 359;
				}
				else if (self.degree > 360) {
					self.degree = 1;
				}

				self.el.css({
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

		// Build event listener for the movement keys.
		this.buildControl = function(){

			keyListener.register_combo({
				"keys"              : "g",
				"prevent_repeat"    : true,
				"on_keydown"        : function(){self.rotate("acw");},
				"on_keyup"          : function(){clearInterval(animateLeft);}
			});

			keyListener.register_combo({
				"keys"              : "h",
				"prevent_repeat"    : true,
				"on_keydown"        : function(){self.rotate("cw");},
				"on_keyup"          : function(){clearInterval(animateRight);}
			});

		};

		
	};

	// End of Function to build object triangle




	// Builder function to create game object
	var gameMaker = function() {
		var self = this;
		this.blockCounter = 0;
		this.nowPlayingInterval = null;


		this.makeBlock = function(position, blockId) {
			$('.blockContainer').append('<img src="img/blockOrigin.svg" class="block blockPosition'+position+'"" id="block'+blockId+'">');
		};


		this.createWall = function(){
			var wallArray = [0,0,0,0,0,0];
			var wallFullCounter = 0;

				for (i=0; i<wallArray.length; i++) {

					random = Math.random();
					if (random < 0.66) {
							wallArray[i] = 1;
					}
						 
				}


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


		this.checkCollision = function(blockIndex) {
			var startPoint= blockIndex * 60;
			var endPoint = startPoint + 60;

			setTimeout(function() {
				var playerPosition = player1.degree;
				if ((player1.degree > startPoint) && (player1.degree < endPoint)) {
					alert('You lose'+blockIndex);
					clearInterval(self.nowPlayingInterval);
				}

			}, 2350);
		};


		this.spawnWall = function() {
			var wallArray = self.createWall();

			for (i = 0; i < wallArray.length; i++) {

				if (wallArray[i] === 1) {
					self.blockCounter++;
					var thisBlock = self.blockCounter;

					self.makeBlock(i, thisBlock);
					
					self.animateBlock(i, thisBlock);

					self.checkCollision(i);
					
				}
			}
		};


		this.start = function() {
			self.nowPlayingInterval = setInterval(function(){
				self.spawnWall();
			}, 1000);
		};



	};
	// end of builder function to creat game object
	
	



	// Initialise
	var game = new gameMaker();
	var player1 = new triangleMaker(1);
	player1.buildControl();



	// testing
	keyListener.register_combo({
		"keys"              : "e",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){game.start();}
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
			$("#block1").velocity({
				"top": "384px",
				"left": "512px",
				"height": "30px",
				"width": "0"
			},
				3000, function() {
				$("#block1").remove();
			});
		}

	});

	

});