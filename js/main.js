;(function(window, undefined){

    var canvas = document.getElementById('rndm');
    var ctx = canvas.getContext("2d");
    
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.oImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;

    function randomInRange(min, max) {
        return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
    }

    RNDM = window.RNDM || {
        scale: 20,
        msg: 'rndm',
        jitter: [-1, 1],
        color: [118, 189, 255]
    };

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

    ctx.strokeStyle = '#222';
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    ctx.lineWidth = 1;

    var jitterOffset = Math.max(Math.abs(RNDM.jitter[0]), Math.abs(RNDM.jitter[1]));

    var draw = function(ctx, character, scale, xoffset){
        if(!chars.hasOwnProperty(character)){
            throw 'char "' + character + '" not definied :(';
        }

        var data = chars[character];
        if(data.length <= 0){
            return;
        }

        ctx.beginPath();

        // initial moveTo
        var x = jitterOffset + xoffset * scale + data[0][0] * scale + randomInRange(RNDM.jitter[0], RNDM.jitter[1]),
            y = jitterOffset + data[0][1] * scale + randomInRange(RNDM.jitter[0], RNDM.jitter[1]);
        ctx.moveTo(x,y);

        var nextAction = 'lineTo';
        for(var i = 1; i < data.length; i++){
            var point = data[i];

            if(point === null){
                nextAction = 'moveTo';
            }else{
                x = jitterOffset + xoffset * scale + point[0] * scale + randomInRange(RNDM.jitter[0], RNDM.jitter[1]);
                y = jitterOffset + point[1] * scale + randomInRange(RNDM.jitter[0], RNDM.jitter[1]);

                ctx[nextAction](x, y);
                nextAction = 'lineTo';
            }
        }

        ctx.stroke();
    };


    var blueOffset = 2,
        redOffset = 1,
        greenOffset = .5;

    var drawStr = function(str){
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        for(var c = 0; c < str.length; c++){
            var character = str[c];
            draw(ctx, character, RNDM.scale, 3 * c);
        }

        RNDM.color[0] += redOffset;
        RNDM.color[1] += greenOffset;
        RNDM.color[2] += blueOffset;

        if(RNDM.color[0] > 228 || RNDM.color[0] < 27){
            redOffset *= -1;
        }
        if(RNDM.color[1] > 228 || RNDM.color[1] < 27){
            greenOffset *= -1;
        }
        if(RNDM.color[2] > 228 || RNDM.color[2] < 27){
            blueOffset *= -1;
        }

        ctx.strokeStyle = 'rgb(' + RNDM.color.join(',') + ')';
    };

    function animate() {
        requestAnimationFrame( animate );
        drawStr(RNDM.msg);
    }
    animate();

})(window)

