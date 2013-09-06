;(function(window, undefined){


    window.RNDM.Font = function(cfg){
        var ctx = cfg.ctx,
            scale = cfg.scale,
            jitter = cfg.jitter,
            color = cfg.color;

        // list of available chars
        var chars = {
            ' ': [],
            a: [[0,4], [1,0], [2,4], null, [0,3], [2,3]],
            b: [[0,2], [2,2], [2,3], [1,4], [0,4],[0,0], [1,0], [2,1], [2,2]],
            c: [[2,4], [1,4], [0,3], [0,1], [1,0],[2,0]],
            d: [[0,4], [0,0],[1,0],[2,1],[2,3],[1,4], [0,4]],
            e: [[2,4], [0,4],[0,0],[2,0], null, [0,2],[1,2]],
            f: [[0,4],[0,0],[2,0], null, [0,2],[1,2]],
            g: [[2,0],[1,0],[0,1], [0,4],[2,4],[2,2], [1,2]],
            h: [[0,0],[0,4], null, [2,0], [2,4], null, [0,3],[2,3]],
            i: [[1,4], [1,1]],
            j: [[0,4], [1,4], [1,1]],
            k: [[0,4], [0,0], [0,2],[1,2], null, [2,0], [2,1], [1,2], [2,3], [2,4]],
            l: [[0,0], [0,4], [2,4]],
            m: [[0,4], [0,0], [1,2], [2,1], [2,4]],
            n: [[0,4], [0,1], [2,4], [2,0]],
            o: [[0,4], [0,1], [2,1], [2,4], [0,4]],
            p: [[0,4], [0,0], [2,0], [2,2], [0,2]],
            q: [[2,4], [0,4], [0,1], [2,1], [2,4], [1,3]],
            r: [[0,4], [0,0], [1,0], [2,1], [1,2], [0,2], null,[1,2], [2,4]],
            s: [[0,4], [2,4], [2,2], [0,2], [0,0], [2,0]],
            t: [[1,4], [1,0], null, [0,0], [2,0]],
            u: [[0,1], [0,4], [2,4], [2,1]],
            v: [[0,1], [0,3], [1,4], [2,3], [2,1]],
            w: [[0,1], [0,4], [1,4], [1,1], null, [1,4],[2,3], [2,1]],
            x: [[0,0], [2,4], null, [2,0], [0,4]],
            y: [[0,0], [1,2], [2,0], null, [1,2], [1,4]],
            z: [[0,0], [2,0], [0,4], [2,4]]
        };
        var jitterOffset = Math.max(Math.abs(jitter[0]), Math.abs(jitter[1]));

        var drawChar = function(cfg){
            var character = cfg.character,
                pos = cfg.pos;

            // methods
            var randomInRange = RNDM.Random.randomInRange;

            // check if char is defined
            if(!chars.hasOwnProperty(character)){
                throw 'char "' + character + '" not definied :(';
            }

            // get point data for char
            var data = chars[character];

            // if data is empty skip
            if(data.length <= 0){
                return;
            }

            // start path
            ctx.beginPath();

            // initial moveTo
            var x = jitterOffset + pos.x + data[0][0] * scale + randomInRange(jitter[0], jitter[1]),
                y = jitterOffset + pos.y + data[0][1] * scale + randomInRange(jitter[0], jitter[1]);
            ctx.moveTo(x,y);

            var nextAction = 'lineTo';
            for(var i = 1; i < data.length; i++){
                var point = data[i];

                if(point === null){
                    nextAction = 'moveTo';
                }else{
                    x = jitterOffset + pos.x + point[0] * scale + randomInRange(jitter[0], jitter[1]);
                    y = jitterOffset + pos.y + point[1] * scale + randomInRange(jitter[0], jitter[1]);

                    ctx[nextAction](x, y);
                    nextAction = 'lineTo';
                }
            }

            ctx.stroke();
        };

        var drawStr = function(cfg){
            var color = cfg.color;
            var str = cfg.msg.toLowerCase();
            var center = cfg.center;
            var charWidth = scale * 3;
            var charHeight = scale * 4;

            ctx.strokeStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';

            for(var c = 0; c < str.length; c++){
                var character = str[c];

                var pos = {};

                pos.x = center.x + charWidth * (c - str.length / 2);
                pos.y = center.y - charHeight / 2;

                drawChar({
                    ctx: ctx,
                    character: character,
                    scale: RNDM.scale,
                    pos: {
                        x: pos.x,
                        y: pos.y
                    }
                });
            }

        };

        return {
            drawStr: drawStr,
            drawChar: drawChar
        }
    };


})(window)