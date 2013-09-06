;(function(window, undefined){

    window.RNDM.Random = {
        randomInRange: function(min, max) {
            return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
        }
    };
    window.RNDM.Browser = {
        viewport: function(){
            // from http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript

            var e = window
                , a = 'inner';
            if ( !( 'innerWidth' in window ) )
            {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
        }
    };
    window.RNDM.Color = {
        interpolate: function(col1, col2, percentage){
            return {
                r: Math.round(col1.r * percentage + col2.r * (1- percentage)),
                g: Math.round(col1.g * percentage + col2.g * (1- percentage)),
                b: Math.round(col1.b * percentage + col2.b * (1- percentage))
            }
        },
        invert: function(col){
            return {
                r: 255 - col.r,
                g: 255 - col.g,
                b: 255 - col.b
            }
        }
    };
    window.RNDM.Math = {
        clamp: function(val, min, max){
            return Math.min(Math.max(val, min), max);
        }
    }

})(window)