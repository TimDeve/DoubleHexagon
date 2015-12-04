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
        self = this;
<<<<<<< HEAD
        this.blockCounter = 0;

        this.makeBlock = function() {
            self.blockCounter++;
            $('.blockContainer').append('<div class="block" id="block'+self.blockCounter+'"></div>');
        };

        // this.

=======
        this.wallCounter = 0;
        
        this.makeWall = function() {
            self.wallCounter++;
            $('.blockContainer').append('<div class="block" id="block'+self.wallCounter+'"></div>');
        };

>>>>>>> dc787475eef30ddc333f17e1722164f2a8388a8b
    };






    // Initialise
    var game = new gameMaker();
    var player1 = new triangleMaker(1);
    player1.buildControl();





    keyListener.register_combo({
        "keys"              : "t",
        "prevent_repeat"    : true,
<<<<<<< HEAD
        "on_keydown"        : function(){game.makeBlock();}
=======
        "on_keydown"        : function(){game.makeWall();}
>>>>>>> dc787475eef30ddc333f17e1722164f2a8388a8b
    });

});