;(function(window, undefined){

    window.RNDM.Random = {
        randomInRange: function(min, max) {
            return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
        }
    };

})(window)