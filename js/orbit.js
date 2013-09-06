;(function(window, undefined){


    window.RNDM.Orbit = function(cfg){
        var radius = cfg.radius;
        var center = cfg.center;

        var getPos = function(percent){
            var t = 2 * Math.PI * (percent);
            var newX = Math.round(center.x + radius * Math.cos(t));
            var newY = Math.round(center.y + radius * Math.sin(t));

            return {
                x: newX,
                y: newY
            };
        };

        return {
            getPos: getPos
        }
    };


})(window)