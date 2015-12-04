$(function () {
    var keyListener = new window.keypress.Listener();

    var $el = $(".square");
    var degree = 0;
    var animateRight;
    var animateLeft;



    var gKeyUpFunc = function() {
        animateLeft = setInterval(function() {
            $el.css({
                WebkitTransform: 'rotate(' + degree + 'deg)'
            });
            degree--;
        }, 1);
    };

    var gKeyDownFunc = function() {
        clearInterval(animateLeft);
    };

    keyListener.register_combo({
        "keys"              : "g",
        "prevent_repeat"    : true,
        "on_keydown"        : function(){gKeyUpFunc()},
        "on_keyup"          : function(){gKeyDownFunc()}
    });




    var hKeyUpFunc = function() {
        animateRight = setInterval(function() {
            $el.css({
                WebkitTransform: 'rotate(' + degree + 'deg)'
            });
            degree++;
        }, 1);
    };

    var hKeyDownFunc = function() {
        clearInterval(animateRight);
    };

    keyListener.register_combo({
        "keys"              : "h",
        "prevent_repeat"    : true,
        "on_keydown"        : function(){hKeyUpFunc()},
        "on_keyup"          : function(){hKeyDownFunc()}
    });


    // var $el = $(".square");
    // var degree = 0;
    // var animateRight;
    // var animateLeft;
    // var keyDownRight;
    // var keyDownLeft;


    // $(document).keydown(function(){
        
        
    // });

    // $(document).keyup(function(){
    //     keyDown= false;
    //     clearInterval(animateRight);
    // });
    

    // $(document).keydown(function(e) {
    //     switch(e.which) {
    //         case 37: // left
    //             if (!keyDownLeft) {
    //                 keyDownLeft= true;
    //                 animateRight = setInterval(function() {
    //                     $el.css({
    //                         WebkitTransform: 'rotate(' + degree + 'deg)'
    //                     });
    //                     degree++;
    //                 }, 2);
    //             }
    //         break;


    //         case 39: // right
    //             if (!keyDownRight) {
    //                 keyDownRight= true;
    //                 animateRight = setInterval(function() {
    //                     $el.css({
    //                         WebkitTransform: 'rotate(' + degree + 'deg)'
    //                     });
    //                     degree--;
    //                 }, 2);
    //             }
    //         break;

    //         // case 38: // up
    //         // break;

    //         // case 40: // down
    //         // break;

    //         default: return; // exit this handler for other keys
    //     }
    //     e.preventDefault(); // prevent the default action (scroll / move caret)
    // });

    // $(document).keyup(function(e) {
    //     keyDownLeft= false;
    //     clearInterval(animateLeft);
    //     keyDownRight= false;
    //     clearInterval(animateRight);
    //     e.preventDefault(); // prevent the default action (scroll / move caret)
    // });
});