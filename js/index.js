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


	var gameMaker = function() {
		var self = this;
		var wallArray = [0,0,0,0,0,0];
		this.blockCounter = 1;


		this.makeBlock = function() {
			// self.blockCounter++;
			$('.blockContainer').append('<img src="img/blockOrigin.svg" class="block blockPosition5" id="block'+self.blockCounter+'">');
		};

		this.createWall = function(){
			wallArray = [0,0,0,0,0,0];
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

		};

		this.animateBlock = function(blockIndex, blockNumber) {
			var startPoint= blockIndex * 60;
			var endPoint = startPoint + 60;
			var thisId = "#block"+blockNumber;
			console.log(thisId);
			// switch(blockIndex) {
			// 	case 0:
			// 		$("#block"+blockIndex)
			// 		break;
			// 	case 1:
			// 		statements_1
			// 		break;
			// 	case 2:
			// 		statements_1
			// 		break;
			// 	case 3:
			// 		statements_1
			// 		break;
			// 	case 4:
			// 		statements_1
			// 		break;
			// 	case 5:
			// 		statements_1
			// 		break;
			// 	default:
			// 		statements_def
			// 		break;
			// }

		};

		this.spawnWall = function() {
			self.createWall();

		};


	};






	// Initialise
	var game = new gameMaker();
	var player1 = new triangleMaker(1);
	player1.buildControl();



	// testing
	game.makeBlock();
	keyListener.register_combo({
		"keys"              : "r",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){game.animateBlock(0, 33);}
	});

	keyListener.register_combo({
		"keys"              : "t",
		"prevent_repeat"    : true,
		"on_keydown"        : function(){game.makeBlock();}
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