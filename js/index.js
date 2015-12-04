$(function () {
    var keyListener = new window.keypress.Listener();

    var $el = $(".square");
    var degree = 0;

    var triangleMaker = function(player) {
        this.el = $(".triangle"+player);
        this.fullPlayer = "player"+player;
        this.degree = 0;
        var animateLeft;
        var animateRight;


        this.rotate = function(cwOrCcw) {
            
            var anim;
            
            anim = setInterval(function() {
                if(player1.degree < 0) {
                    player1.degree = 359;
                }
                else if (player1.degree > 360) {
                    player1.degree = 1;
                }

                $el.css({
                    WebkitTransform: 'rotate(' + player1.degree + 'deg)'
                });

                if (cwOrCcw === "right") {
                    player1.degree++;
                }
                else if (cwOrCcw === "left") {
                    player1.degree--;
                }
                
            }, 1);

            if (cwOrCcw === "right") {
                animateRight = anim;
            }
            else if (cwOrCcw === "left") {
                animateLeft = anim;
            }


        };


        this.buildControl = function(){

            keyListener.register_combo({
                "keys"              : "g",
                "prevent_repeat"    : true,
                "on_keydown"        : function(){player1.rotate("left");},
                "on_keyup"          : function(){clearInterval(animateLeft);}
            });

            keyListener.register_combo({
                "keys"              : "h",
                "prevent_repeat"    : true,
                "on_keydown"        : function(){player1.rotate("right");},
                "on_keyup"          : function(){clearInterval(animateRight);}
            });

        };

        
    };

    var player1 = new triangleMaker(1);
    player1.buildControl();

});




// function keeper() {
//     var keyListener = new window.keypress.Listener();

//     var $el = $(".square");
//     var degree = 0;
//     var animateRight;
//     var animateLeft;



//     var gKeyUpFunc = function() {
//         animateLeft = setInterval(function() {
//             if(degree < 0) {
//                 degree = 359;
//             }
//             else if (degree > 360) {
//                 degree = 1;
//             }
//             $el.css({
//                 WebkitTransform: 'rotate(' + degree + 'deg)'
//             });
//             degree--;
//         }, 1);
//     };

//     var gKeyDownFunc = function() {
//         clearInterval(animateLeft);
//     };

//     keyListener.register_combo({
//         "keys"              : "g",
//         "prevent_repeat"    : true,
//         "on_keydown"        : function(){gKeyUpFunc()},
//         "on_keyup"          : function(){gKeyDownFunc()}
//     });




//     var hKeyUpFunc = function() {
//         animateRight = setInterval(function() {
//             if(degree < 0) {
//                 degree = 359;
//             }
//             else if (degree > 360) {
//                 degree = 1;
//             }
//             $el.css({
//                 WebkitTransform: 'rotate(' + degree + 'deg)'
//             });
//             degree++;
//         }, 1);
//     };

//     var hKeyDownFunc = function() {
//         clearInterval(animateRight);
//     };

//     keyListener.register_combo({
//         "keys"              : "h",
//         "prevent_repeat"    : true,
//         "on_keydown"        : function(){hKeyUpFunc()},
//         "on_keyup"          : function(){hKeyDownFunc()}
//     });
// }