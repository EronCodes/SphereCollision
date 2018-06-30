var body = document.getElementById("body");
var item = document.querySelector("#moveItem");
var itemRect = item.getBoundingClientRect();
var died = false;
var score = 0;
var highscore = localStorage.getItem("Setting");
var xPos;
var yPos;
var modw = 100;
var modh = 100;
var playeralpha = 1;

document.addEventListener("mousemove", followMouse, false);

  

function followMouse(e) {

    if((e.pageY < 80) && (e.pageX > 550 && e.pageX < 1375) || died) {
    

    } else {
     xPos = e.pageX - itemRect.width / 2 -10;
     yPos = e.pageY - itemRect.height / 2 - 65;
    }

    //console.log(xPos + " " + yPos); 
    console.log(died);



        item.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        
}




var drawSetDown = (function () {

    var executed = false;
        return function() {

            if(!executed) {
        
                executed = true;                
                
                var goverImg = new Image(1920, 1080);
                goverImg.src = 'spherecollision_gameoverscreen.png';
                document.body.appendChild(goverImg);
                goverImg.style.marginTop = "-148px";
                goverImg.style.position = "fixed";
                goverImg.style.zIndex = "9999";
                
                var restartImg = document.getElementById("restart");
                restartImg.id = "restartatgover";
                restartImg.src = 'spherecollision_restartbutton_unhovered.png';
                document.body.appendChild(restartImg);
                restartImg.style.zIndex = "100000";
                restartImg.style.position = "fixed";
                restartImg.style.marginTop = "494px";
                restartImg.style.marginLeft = "45%";

                var displayscore = document.createElement("p");
                var txtscore = document.createTextNode("Score: " + score);
                displayscore.appendChild(txtscore);
                var elementscore = document.getElementById("collecdiv");
                elementscore.appendChild(displayscore);
                displayscore.style.zIndex = "200000";
                displayscore.style.position = "absolute";
                displayscore.style.fontSize = "40px";
                displayscore.style.marginLeft = "48%";
                displayscore.style.marginTop = "15%";

                /*if(typeof(Storage) !== "undefined") {
                    localStorage.setItem()
                } */
            
                var displayscore = document.createElement("p");
                var txtscore = document.createTextNode("Highscore: " + highscore);
                displayscore.appendChild(txtscore);
                var elementscore = document.getElementById("collecdiv");
                elementscore.appendChild(displayscore);
                displayscore.style.zIndex = "200000";
                displayscore.style.position = "absolute";
                displayscore.style.fontSize = "40px";
                displayscore.style.marginLeft = "46.5%";
                displayscore.style.marginTop = "18%";

            }
        };        
})();

function restarting() {
    location.reload();
}


function Rectangles(xpos, ypos, move, speed, width, height, color, isRect, bRadius) {

                

    function collision () {
       // console.log("XXXXX");
        if((xPos < xpos + speed + 100 && xPos > xpos + speed - 75)
           &&
           (yPos < ypos +50 && yPos > ypos - 130)) {
          died = true;
          setHighScore(score);
        }

        /*if((xPos > 1000 && xPos < 1200) && (yPos > 300 && yPos < 500)) {
            alert("Found objective!");
        }*/
        
            
        }

    function collected () {

        if((xPos < xpos + speed + 50 && xPos > xpos + speed - 75)
           &&
           (yPos < ypos  && yPos > ypos - 130)) {
            score++
            speed -= body.offsetWidth + 100; // X
            ;
           }

    }

        
    
        
    
    this.xpos = xpos;
    this.ypos = ypos;
    this.mleft = move;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
    this.isRect = isRect;
    this.bRadius =  bRadius;

    

    this.anzeigen = function() {
        var rechteck = document.createElement("div");
        rechteck.style.width = this.width + "px";
        rechteck.style.height = this.height + "px";
        rechteck.style.position = "fixed";
        rechteck.style.left = this.xpos + "px";
        rechteck.style.top = this.ypos + "px";
        rechteck.style.backgroundColor = this.color;
        body.appendChild(rechteck);
        rechteck.style.borderColor = "blue";
        rechteck.style.borderRadius = bRadius;

      

        
        
            
            
            
                   
        var itvlmovement = setInterval(function() {
        
            if(died) {
                drawSetDown();
                body.style.cursor = "default";
            } else {
                body.style.cursor = "none";
            }
            rechteck.style.marginLeft = speed + move + "px";

        speed += move;
    

        /*if((xPos + itemRect.width && yPos + itemRect.height) <= (xpos + rechteck.style.width && ypos + rechteck.style.height)) {
            alert("getroffen");
        } */
            //console.log(xpos + " " + ypos);


            if(xpos + speed > body.offsetWidth) {
                speed -= body.offsetWidth + 100; // X
            }

            if(isRect) {
                collision();
            } else {
                collected();
            }

    }, 5);


      

    
    //console.log(rechteck.style.left + rechteck.style.marginLeft);

    }

   

   
}

                


var counterRects = 0, howManyRects = 20;

    function createRects() {
       var rects = new Rectangles(-100, Math.floor(Math.random()*body.offsetHeight), Math.floor(Math.random()*4) + 1, 0, 100, 100, "#880000", true, "10px");
        counterRects++;
        if(counterRects < howManyRects) {
            setTimeout(createRects, 500);
        }
           
    
rects.anzeigen();
    }

    var counterCoins = 0, howManyCoins = 10;

    function createCoins() {
       var coins = new Rectangles(-100, Math.floor(Math.random()*body.offsetHeight), Math.floor(Math.random()*4) + 1, 0, 50, 50, "#CCCC00", false, "50%");
        counterCoins++;
        if(counterCoins < howManyCoins) {
            setTimeout(createCoins, 500);
        }
           
    
coins.anzeigen();
    }

function setHighScore(score) {

    if(score > highscore) {
        localStorage.setItem("Setting", score);

        var displayhighscore = document.createElement("p");
                var txthighscore = document.createTextNode("Congratulations, you got a new highscore!");
                displayhighscore.appendChild(txthighscore);
                var elementhighscore = document.getElementById("collecdiv");
                elementhighscore.appendChild(displayhighscore);
                displayhighscore.style.zIndex = "200000";
                displayhighscore.style.position = "absolute";
                displayhighscore.style.fontSize = "40px";
                displayhighscore.style.marginLeft = "46.5%";
                displayhighscore.style.marginTop = "10%";

    }

}

    createRects();
    createCoins();