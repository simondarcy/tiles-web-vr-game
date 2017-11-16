/* WebVR game by Simon Darcy 2017 */


function gameOver(){
    document.getElementById('splash').setAttribute('visible', true);
    document.getElementById('title').setAttribute('material', 'opacity', 1);
    document.getElementById('title').setAttribute('text-geometry', 'value', 'Game Over');
    document.getElementById('title').setAttribute('position', '-2 0.7 -0.1');
    document.getElementById('title').setAttribute('scale', '0.5 0.5 0.5');
    winner();
}


function winner(){
    document.getElementById('splash').setAttribute('visible', true);
    document.getElementById('title').setAttribute('material', 'opacity', 1);
    document.getElementById('title').setAttribute('position', '-0.9 0.7 -0.1');
    document.getElementById('title').setAttribute('scale', '0.5 0.5 0.5');
    document.getElementById('title').setAttribute('text-geometry', 'value', 'You Win');
}

colors = [0x800080,0x800080,
    0xFF00FF,0xFF00FF,
    0x000080,0x000080,
    0x00FF00,0x00FF00,
    0x008080,0x008080,
    0xFFFF00,0xFFFF00,
    0x800000,0x800000,
    0xFF0000,0xFF0000,
    0xC0C0C0,0xC0C0C0,
    0x0000FF,0x0000FF] ;

flipped = 0;
canFlip = true;
score = 0;

var timeleft = 500;
var timer = setInterval(function(){
    timeleft--;
    document.getElementById('timer').setAttribute('text', 'value', 'Time: '+ timeleft);
    if(timeleft <= 0) {
        gameOver();
        clearInterval(timer);

    }
},1000);


function anim(animation){

    if (animation=="shrink"){
        score++;
        document.getElementById('score').setAttribute('text', 'value', 'Score: '+score);
        timeleft+=5;
        console.log(score)
    }
    if (score == 10){
        clearInterval(timer);
        winner();
    }

    var tiles = document.querySelectorAll(".flipped");
    for (var i = tiles.length; i--;) {

        me = tiles[i];
        console.log(animation);
        me.emit(animation);
        //me.emit('shrink');
        me.setAttribute('class', '');

    }

}

function check(){

    console.log('check');
    //get open tiles

    flipped = 0;

    var tiles = document.querySelectorAll(".flipped");

    console.log(tiles[0].value);
    console.log(tiles[1].value);

    var animation = (tiles[0].value == tiles[1].value)?"shrink":"hide";

    setTimeout(function(){
        anim(animation);
    }, 1000);
    //if equal collpase
    //else flip back

}


AFRAME.registerComponent('selectable', {

    init: function () {


        rnd = Math.floor(Math.random()*colors.length)
        var randColor = colors[rnd];

        colors.splice(rnd, 1);


        console.log(colors);

        var materials = [
            new THREE.MeshBasicMaterial( { color: 0xff0000 } ), // right
            new THREE.MeshBasicMaterial( { color: 0xff0000 } ), // left
            new THREE.MeshBasicMaterial( { color: 0xff0000 } ), // top
            new THREE.MeshBasicMaterial( { color: 0xff0000 } ), // bottom
            new THREE.MeshBasicMaterial( { color: 0x00ffff } ), // back (this will be random)
            new THREE.MeshBasicMaterial( { color: randColor } )  // front
        ];

        this.el.value = randColor;

        this.el.getObject3D('mesh').material  = new THREE.MultiMaterial(materials);

        this.el.val = "red";

        this.el.addEventListener('mouseenter', function (evt) {
            //this.emit('show');
        });
        this.el.addEventListener('mouseleave', function (evt) {
            canFlip = true;
        });
        this.el.addEventListener('click', function (evt) {

            if (!canFlip){
                return;
            }

            //this.setAttribute('material', 'color', 'red');
            this.emit('show');
            this.setAttribute('class', 'flipped');

            flipped++;

            //if 2 tiles fl
            if(flipped == 2){
                canFlip = false;
                check();
            }

        });
    }
});
