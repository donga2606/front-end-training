var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');

var scoreshow = document.getElementById('score');

var birdImg = new Image();
var background = new Image();
var downChimney = new Image();
var upChimney = new Image();

birdImg.src = 'images/bird.png';
background.src = 'images/background.png';
downChimney.src = 'images/downChimney.png';
upChimney.src = 'images/upChimney.png';

var score=0;

var distanceChimney = 140;
var distanceDownChimney;

var bird = {
    x: background.width/5,
    y: background.height/2,
};

var chimney=[];
chimney[0] = {
    x: canvas.width,
    y: 0,
};

function run() {
    console.log('hi')
    context.drawImage(background, 0, 0);
    context.drawImage(birdImg, bird.x, bird.y);
    bird.y += 3;
    requestAnimationFrame(run);
    for (var i = 0;i<chimney.length;i++) {
        distanceDownChimney = upChimney.height+distanceChimney;
        context.drawImage(upChimney, chimney[i].x, chimney[i].y);
        context.drawImage(downChimney, chimney[i].x, chimney[i].y+distanceDownChimney);
        chimney[i].x -= 5;

        if (chimney[i].x==canvas.width/2){
            chimney.push({
                x: canvas.width,
                y: Math.floor(Math.random()*upChimney.height)- upChimney.height
            })
        }
        if (chimney[i].x==0)chimney.splice(0,1);
        if (chimney[i].x==bird.x)score++;
        if (bird.y+birdImg.height==canvas.height||
            bird.x+birdImg.width>= chimney[i].x && bird.x<chimney[i].x+upChimney.width 
            && (bird.y<chimney[i].y+upChimney.height||
            bird.y + birdImg.height>=chimney[i].y+distanceDownChimney)
            ){
                return;
        }
    
    }

}

scoreshow.innerHTML='score: '+score;
document.addEventListener('keydown', function(){
    bird.y -= 60;

})

run();




