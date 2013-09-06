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

    }

})(window)