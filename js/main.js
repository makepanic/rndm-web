;(function(window, undefined){

    var canvas = document.getElementById('rndm');

    // overwrite canvas dimension
    var vp = RNDM.Browser.viewport();
    canvas.width = vp.width;
    canvas.height = vp.height;

    var ctx = canvas.getContext("2d");

    var fill = [ 255, 255, 255, .4];
    var minCol = {
        r: 22,
        g: 57,
        b: 100
    };
    var maxCol = {
        r: 255,
        g: 255,
        b: 255
    };
    var sunCol = {
        dark: {
            r: 126,
            g: 96,
            b: 23
        },
        light: {
            r: 255,
            g: 248,
            b: 189
        }
    };
    var fontCol = {
        dark: {
            r: 40,
            g: 98,
            b: 171
        },
        light: {
            r: 118,
            g: 189,
            b: 255
        }
    };

    ctx.imageSmoothingEnabled = true;
    ctx.mozImageSmoothingEnabled = true;
    ctx.oImageSmoothingEnabled = true;
    ctx.webkitImageSmoothingEnabled = true;

    ctx.strokeStyle = '#222';
    ctx.fillStyle = 'rgba(' + fill.join(',') + ')';
    ctx.lineWidth = 1;

    var font = new RNDM.Font({
        ctx: ctx,
        scale: 20,
        color: [118, 189, 255],
        jitter: [-1, 1]
    });
    var links = new RNDM.Font({
        ctx: ctx,
        scale: 4,
        color: [118, 189, 255],
        jitter: [-1, 1]

    })

    var sky = new RNDM.Sky({
        ctx: ctx,
        scale: 20,
        jitter: [-1, 1]
    });

    var orbit = new RNDM.Orbit({
        radius: Math.min(canvas.width, canvas.height) - 75,
        center: {
            x: canvas.width / 2,
            y: canvas.height
        }
    });

    var secsInDay = 60 * 60 * 24;

    function animate() {
        requestAnimationFrame( animate );

        // 6 - 18 o'clock visible
        var date = new Date();
        var secOfDay = date.getSeconds() +
            60 * date.getMinutes() +
            60 * 60 * date.getHours();

        var progress = secOfDay / secsInDay;
        progress = (progress + .25) % 1;

        // calculate fillstyle
        var colProgress = (progress - .25) * 2;

        colProgress = colProgress > 1 ? colProgress - 2 * (colProgress - 1) : colProgress;
        colProgress = Math.abs(colProgress);

        var color = RNDM.Color.interpolate(maxCol, minCol, colProgress);
        var gradient = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')');
        gradient.addColorStop(1,
            'rgb(' + RNDM.Math.clamp(color.r - RNDM.gradientOffset, 0, 255) + ',' +
                     RNDM.Math.clamp(color.g - RNDM.gradientOffset, 0, 255) + ',' +
                     RNDM.Math.clamp(color.b - RNDM.gradientOffset, 0, 255) + ')');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        font.drawStr({
            color: color.r > 128 ? fontCol.dark : fontCol.light,
            msg: RNDM.msg,
            center: {
                x: canvas.width / 2,
                y: canvas.height / 2
            }
        });
        links.drawStr({
            color: color.r > 128 ? fontCol.dark : fontCol.light,
            msg: 'github',
            center: {
                x: canvas.width / 2 - 80,
                y: canvas.height / 2 + 88
            }
        });
        links.drawStr({
            color: color.r > 128 ? fontCol.dark : fontCol.light,
            msg: 'blog',
            center: {
                x: canvas.width / 2,
                y: canvas.height / 2 + 88
            }
        });
        links.drawStr({
            color: color.r > 128 ? fontCol.dark : fontCol.light,
            msg: 'twitter',
            center: {
                x: canvas.width / 2 + 80,
                y: canvas.height / 2 + 88
            }
        });

        var sunCenter = orbit.getPos(progress);
        var sunColor = color.r > 175 ? sunCol.dark : sunCol.light;
        ctx.strokeStyle = 'rgb(' + sunColor.r + ',' + sunColor.g + ',' + sunColor.b + ')';
        sky.drawSun({
            x: sunCenter.x,
            y: sunCenter.y,
            points: 5,
            radius: 20,
            rMul: -1
        });
        sky.drawSun({
            x: sunCenter.x,
            y: sunCenter.y,
            points: 7,
            radius: 26,
            rMul: 1
        });
        sky.drawSun({
            x: sunCenter.x,
            y: sunCenter.y,
            points: 6,
            radius: 40,
            rMul: .2
        });
    }
    animate();

})(window)

