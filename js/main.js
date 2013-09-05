;(function(window, undefined){

    var canvas = document.getElementById('rndm');
    var ctx = canvas.getContext("2d");
    
    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.oImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;

    ctx.strokeStyle = '#222';
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    ctx.lineWidth = 1;

    var font = new RNDM.Font({
        ctx: ctx,
        scale: 20,
        offsets: {
            r: 1,
            g: .5,
            b: 2
        },
        color: [118, 189, 255],
        jitter: [-1, 1]
    });

    var sky = new RNDM.Sky({
        ctx: ctx,
        scale: 20,
        jitter: [-1, 1]
    });

    function animate() {
        requestAnimationFrame( animate );

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        font.drawStr(RNDM.msg);
        sky.drawSun({
            x: 100,
            y: 150,
            points: 5,
            radius: 20,
            rMul: -1
        });
        sky.drawSun({
            x: 100,
            y: 150,
            points: 7,
            radius: 26,
            rMul: 1
        });
        sky.drawSun({
            x: 100,
            y: 150,
            points: 6,
            radius: 40,
            rMul: .2
        });
    }
    animate();

})(window)

