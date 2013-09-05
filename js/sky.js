;(function(window, undefined){


    window.RNDM.Sky = function(cfg){
        var ctx = cfg.ctx,
            scale = cfg.scale,
            jitter = cfg.jitter,
            color = cfg.color;

        var randomInRange = RNDM.Random.randomInRange;

        var jitterOffset = Math.max(Math.abs(jitter[0]), Math.abs(jitter[1]));

        var drawSun = function(cfg){
            var x = cfg.x,
                y = cfg.y,
                points = cfg.points,
                radius = cfg.radius,
                rMul = cfg.rMul;

            ctx.beginPath();

            var offset = rMul * Date.now() / 1E3;

            for(var i = 0; i < points + 1; i++){

                var t = 2 * Math.PI * (i + offset) / points;
                var newX = Math.round(x + radius * Math.cos(t));
                var newY = Math.round(y + radius * Math.sin(t));

                newX += randomInRange(jitter[0], jitter[1]);
                newY += randomInRange(jitter[0], jitter[1]);

                ctx.lineTo(newX, newY);
            }

            ctx.stroke();
        };

        return {
            drawSun: drawSun
        }
    };


})(window)