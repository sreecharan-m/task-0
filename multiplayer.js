let canvas = document.getElementById("game1");
let ctx = canvas.getContext("2d");
let frames=10;
const WIDTH = 700;
const HEIGHT=700;
let toggle=0;
//let cchange=0;
let ballchange=['#FF3','#A0F'];
////////////////////////load sounds////////////////////////

const pointsound = new Audio();
pointsound.src="audio/point.wav";

const hit = new Audio();
hit.src="audio/hit.wav";
/////////////////////////load image//////////////////////

const sprite = new Image();
sprite.src = "images/sprite.png";
///////////////////////////////////////////////

const bcchange =
{
position:[],
f:0,
draw()
{
    if(state.current ==1)
    {
       if(this.position.length == 1)
       {
            for(let j=0;j<4;j++){
            var a = j*(Math.PI/2);
            ctx.fillStyle = obstacle.col2[j];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            //ctx.lineWidth=13;
            ctx.arc(this.position[0].x,this.position[0].y,12,a,a+Math.PI/2);
            ctx.lineTo(this.position[0].x,this.position[0].y);
            ctx.fill();
            ctx.closePath();
         }
       }
    }
},

update()
{
    if(state.current == 1)
    {
    if(frames%1000 == 0)
    {
    if(this.position.length <=1)
    {
        this.position.push({
            x:WIDTH/2,
            y:0.1*HEIGHT
        })
    }
    }

    if(this.position.length == 1)
    {
        this.position[0].y += 1;
        if(this.position[0].y >= ball.y)
        {
            this.position.shift();
            //this.state = 1;
            //this.f=frames;
            if(ball.clr == ballchange[0])
            {
                ball.clr = ballchange[1];
            }
            else
            {
                ball.clr = ballchange[0];
            }
        }
    }
    }
}
}





const powerup = 
{
position:[],
state:0,
f:0,
p:600,
draw(){

    if(state.current ==1)
    {
       if(this.position.length == 1)
       ctx.drawImage(sprite,this.position[0].x - 8, this.position[0].y,20,20);
    }
},
update()
{
    if(state.current ==1)
    {
    
    if(frames%2500 == 0)
    {
    if(this.position.length <=1)
    {
        this.position.push({
            x:WIDTH/2,
            y:0.1*HEIGHT
        })
    }
    }

    if(this.position.length == 1)
    {
        this.position[0].y += 1;
        if(this.position[0].y >= ball.y)
        {
            this.position.shift();
            this.state = 1;
            this.f=frames;
        }
    }


    if(frames >= this.f + 600)
    {
      this.f = 0;
      this.state = 0;
      this.p=600;
    }

    if(this.state == 1)
    {
         
            let k=Math.floor(this.p/60);

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "26px Teko";
            //ctx.fillText("Power", 550, 550);
            ctx.strokeText("power", 620, 550);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "18px Teko";
            ctx.fillText(k, 620, 585);
            ctx.strokeText(k,620, 585);
            ctx.closePath();
            this.p --;
    }
    
    }
}

}

const obstacle = 
{

position:[{
                x:WIDTH/2,
                y:0.4*HEIGHT,
                r:90,
                s:1,
                rot:0,
                vannam:['#F39','#3FF','#FF3','#A0F'] 
            }],
col:['#F39','#3FF','#FF3','#A0F'],        
col2:['#A0F','#F39','#3FF','#FF3'],
col3:['#66ff66','#996633','#0000ff'],
//col4:['#3FF','#FF3','#A0F','#F39'],
//col1:['#F39','#3FF','#FF3','#A0F'],
x: WIDTH/2,
y: 0.4*HEIGHT,
rotation_angle1:0,
rotation_angle2:0,
rotation_angle3:0,
rotation:2*Math.PI,
dx:2,

draw()
{
      //console.log("hi");
      if(state.current == 1){
         
        for(let i=0;i < this.position.length; i++)
        {
            let p=this.position[i];
            
           // let k=Math.floor(Math.random()*(3)) +1 ;
            
            switch(p.s)
            {
                case 1:shape1(p.x,p.y,p.r,p.rot,i);
                       //obstacle.rotation_angle1++;
                       p.rot++;
                       if(p.rot === 90)
                       {
                        p.rot=0;
                        p.vannam.unshift(p.vannam.pop());
                       }
                       break;

                case 2:shape2(p.x,p.y,p.r,p.rot,i);
                       //obstacle.rotation_angle2++;
                       p.rot++;
                       if(p.rot === 120)
                       {
                        p.rot=0;
                        p.vannam.unshift(p.vannam.pop());
                       }
                       break;
                       
                case 3:shape3(p.x,p.y,p.r,p.rot,i);
                       //obstacle.rotation_angle3++;
                       p.rot++;
                       if(p.rot === 90)
                       {
                        p.rot=0;
                        p.vannam.unshift(p.vannam.pop());
                       }
                       break;
                case 4:shape4(p.x,p.y,p.r,p.rot,i);
                       //obstacle.rotation_angle3++;
                       //p.rot++;
                       //if(p.rot === 90)
                       //{
                        //p.rot=0;
                        //p.vannam.unshift(p.vannam.pop());
                       //}
                       break;                         
            }
        }

    }
},

update()
 {
       if(state.current == 1){

         //if(frames%400 == 0)
         //{
            if(this.position.length <= 1 && this.position[0].y  > ball.y)
            {
            let shp=Math.floor(Math.random()*(4)) +1 ;
            //let shp=4;
            console.log(shp);
            let rad=Math.floor((Math.random() * 40) + 60);
            
            if(shp == 2)
            {
                this.position.push({
                x:WIDTH/2,
                y:ball.y-0.45*HEIGHT,
                r:rad,
                s:shp,
                rot:0,
                vannam:['#A0F','#3FF','#FF3']
            });
            }
            else if(shp == 4)
            {
               let c=Math.floor(Math.random()*(3)) ;
               this.position.push({
                x:WIDTH/2,
                y:ball.y-0.45*HEIGHT,
                r:rad,
                s:shp,
                rot:0,
                vannam:obstacle.col3[c]
            });

            }
            else
            {
            this.position.push({
                x:WIDTH/2,
                y:ball.y-0.45*HEIGHT,
                r:rad,
                s:shp,
                rot:0,
                vannam:['#F39','#3FF','#FF3','#A0F']
            });
            }
            pointsound.play();
            score.scr++;
            score.best=Math.max(score.scr,score.best);
            localStorage.setItem("best",score.best);
            }
         //}

         for(let i=0;i < this.position.length; i++)
         {
            let p=this.position[i];
            
            if(ball.jumped > 3)
            {
              //p.y += 35;
              
              for (const el of this.position){

                el.y +=35;

              }


              ball.jumped=0;
            }
            if(p.y-90 > ball.y)
            {
                p.y +=3 ;
            }
            if(p.y >= HEIGHT)
            {
                this.position.shift();
            }
         }
       }
 }
}


function shape1(x,y,r,ang,index){
    
       
            //ctx.save();
            //ctx.translate(obstacle.x,obstacle.y);
         //console.log("hi")
         //let col=obstacle.position[index].vannam;
         
         for(let j=0;j<4;j++){
            var a = j*(Math.PI/2);
            ctx.fillStyle = obstacle.col2[j];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            //ctx.lineWidth=13;
            ctx.arc(x,y,8,a,a+Math.PI/2);
            ctx.fill();
            ctx.closePath();
         }


         for(let i=0;i<4;i++){
            var a = i*(Math.PI/2)+ (ang* Math.PI /180);
            ctx.strokeStyle = obstacle.position[index].vannam[i];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            ctx.lineWidth=13;
            ctx.arc(x,y,r,a,a+Math.PI/2);
            ctx.stroke();
            ctx.closePath();
         }   
           //ctx.rotate(obstacle.rotation);
           //ctx.translate(-obstacle.x,-obstacle.y);
           //ctx.restore();
        // console.log("entered");
         
         let d=(y+r+13)-(ball.y - 8);
         //console.log(d);
         let d2=(y+r+13)-(ball.y + 8);
         if(Math.abs(d)<=3 || Math.abs(d2)<=12)
         {
               //console.log("entered");
               if(!(ball.clr == obstacle.position[index].vannam[0]))
               {
                //console.log("touched");
                if(powerup.state == 0)
                {console.log("gameover");
                 hit.play();
                }
               }
         }
        
        let d3=(y-r-13)-(ball.y - 8);
         //console.log(d);
         let d4=(y-r-13)-(ball.y + 8);
         if(Math.abs(d3)<=12 || Math.abs(d4)<=3)
         {
               //console.log("entered");
               if(!(ball.clr == obstacle.position[index].vannam[2]))
               {
                //console.log("touched");
                if(powerup.state == 0)
                 {console.log("gameover");
                  hit.play();
                 }
               }
         }
}



function shape2(x,y,rad,ang,index){


           /*if(obstacle.rotation_angle2 === 90){
            obstacle.rotation_angle2=0;
            obstacle.col2.unshift(obstacle.col2.pop())
            }
             
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[0];
            ctx.lineWidth=13;
            ctx.moveTo(x,y - 90);
            ctx.lineTo(x - 77.8,y + 45);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[1];
            ctx.lineWidth=13;
            ctx.moveTo(x -77.8,y +45);
            ctx.lineTo(x + 77.8,y + 45);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[2];
            ctx.lineWidth=13;
            ctx.moveTo(x + 77.8,y + 45);
            ctx.lineTo(x,y -90);
            ctx.stroke();
            ctx.closePath();*/

            /*if(obstacle.rotation_angle2 === 120){

            obstacle.rotation_angle2=0;
            obstacle.col2.unshift(obstacle.col2.pop())
            }*/

            //console.log("inside fun");
            

            for(let j=0;j<4;j++){
            var a = j*(Math.PI/2);
            ctx.fillStyle = obstacle.col2[j];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            //ctx.lineWidth=13;
            ctx.arc(x,y,8,a,a+Math.PI/2);
            ctx.fill();
            ctx.closePath();
           }

            let r=rad+10;
            for(let i=0;i<3;i++)
            {
                //console.log("inside loop");
                var a =(2*i*Math.PI/3) + (ang * Math.PI /180);
                ctx.beginPath();
                ctx.strokeStyle=obstacle.position[index].vannam[i];
                ctx.lineWidth=13;
                ctx.moveTo( x + r*Math.cos(a) , y+r*Math.sin(a));
                ctx.lineTo(x + r*Math.cos(a+2*Math.PI/3) , y + r*Math.sin(a+2*Math.PI/3));
                ctx.stroke();
                ctx.closePath();
            }
            let k1;

            if(obstacle.position[index].rot <= 90)
            {
            k1=Math.abs(2*Math.sin((Math.PI/3)+(obstacle.position[index].rot * Math.PI/180)));
            }
            else
            {
            k1=Math.abs(2*Math.sin((Math.PI/3)-(obstacle.position[index].rot * Math.PI/180)));    
            }
            
            let d=(y + r/k1 + 13)-(ball.y - 8);
            //console.log(d);
            let d2=(y+ r/k1 +13)-(ball.y + 8);
            if(Math.abs(d)<=8 || Math.abs(d2)<=18)
            {
               //console.log("enteredtri");
               if(obstacle.position[index].rot <= 120  && obstacle.position[index].rot >= 60)
               {
                if(!((ball.clr == obstacle.position[index].vannam[0]) || (ball.clr == obstacle.position[index].vannam[2])))
               {
                //console.log("touchedtri");
                 if(powerup.state == 0)
                 {console.log("gameover");
                  hit.play();
                 }
               }
               }
               else
               {
                if(!(ball.clr == obstacle.position[index].vannam[0]))
               {
                //console.log("touchedtri");
                if(powerup.state == 0)
                {console.log("gameover");
                 hit.play();
                }
               }

               }
            }
            




            let k3;
            if(obstacle.position[index].rot <= 30)
            {
            k3=Math.abs(2*Math.sin((obstacle.position[index].rot * Math.PI/180)));
            }
            else
            {
            k3=Math.abs(2*Math.sin((2*Math.PI/3)-(obstacle.position[index].rot * Math.PI/180)));    
            }
            


            let d3=(y - r/k3 - 13)-(ball.y - 8);
            //console.log(d);
            let d4=(y - r/k3 - 13)-(ball.y + 8);
            if(Math.abs(d3)<=18 || Math.abs(d4)<=8)
            {
               //console.log("enteredtri");
               
               if(obstacle.position[index].rot <= 120  && obstacle.position[index].rot >= 90)
               {
                if(!((ball.clr == obstacle.position[index].vannam[1]) || (ball.clr == obstacle.position[index].vannam[2])))
               {
                //console.log("touchedtri");
                if(powerup.state == 0)
                {console.log("gameover");
                hit.play();
                }
               }
               }
               else
               {
                if(!(ball.clr == obstacle.position[index].vannam[1]))
               {
                //console.log("touchedtri");
                if(powerup.state == 0)
                {console.log("gameover");
                 hit.play();
                }
               }
               }
            }


}


function shape3(x,y,rad,ang,index){

            /*ctx.beginPath();
            ctx.strokeStyle = obstacle.col[0];
            ctx.lineWidth=13;
            ctx.moveTo(x-90,y - 90);
            ctx.lineTo(x - 90,y + 90);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[1];
            ctx.lineWidth=13;
            ctx.moveTo(x -90,y +90);
            ctx.lineTo(x + 90,y + 90);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[2];
            ctx.lineWidth=13;
            ctx.moveTo(x + 90,y +90);
            ctx.lineTo(x +90,y -90);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.strokeStyle = obstacle.col[3];
            ctx.lineWidth=13;
            ctx.moveTo(x + 90,y -90);
            ctx.lineTo(x-90,y -90);
            ctx.stroke();
            ctx.closePath();
            //console.log("hi");*/

            /* if(obstacle.rotation_angle3 === 90){

            obstacle.rotation_angle3=0;
            obstacle.col3.unshift(obstacle.col3.pop())
            }*/

            //console.log("inside fun");
            let r=rad+30;
            for(let i=0;i<4;i++)
            {
                //console.log("inside loop");
                var a =(i*Math.PI/2) + (ang * Math.PI /180);
                ctx.beginPath();
                ctx.strokeStyle=obstacle.position[index].vannam[i];
                ctx.lineWidth=13;
                ctx.moveTo( x + r*Math.cos(a) , y+r*Math.sin(a));
                ctx.lineTo(x + r*Math.cos(a+Math.PI/2) , y + r*Math.sin(a+Math.PI/2));
                ctx.stroke();
                ctx.closePath();
            }

         

            for(let j=0;j<4;j++){
            var a = j*(Math.PI/2);
            ctx.fillStyle = obstacle.col2[j];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            //ctx.lineWidth=13;
            ctx.arc(x,y,8,a,a+Math.PI/2);
            ctx.fill();
            ctx.closePath();
            }


         let k2;
          k2=Math.abs(1.414*Math.sin((Math.PI/4)+(obstacle.position[index].rot * Math.PI/180)));

         let d=(y+ r/k2 +13)-(ball.y - 8);
         //console.log(d);
         let d2=(y+ r/k2 +13)-(ball.y + 8);
         if(Math.abs(d)<=7 || Math.abs(d2)<=14)
         {
               //console.log("enteredsq");
               if(!(ball.clr == obstacle.position[index].vannam[0]))
               {
                //console.log("touchedsq");
                if(powerup.state == 0)
                {console.log("gameover");
                 hit.play();
                }
               }
         }

         let d3=(y- r/k2 -13)-(ball.y - 8);
         //console.log(d);
         let d4=(y- r/k2 -13)-(ball.y + 8);

          if(Math.abs(d3)<=14 || Math.abs(d4)<=7)
         {
               //console.log("enteredsq");
               if(!(ball.clr == obstacle.position[index].vannam[2]))
               {
                //console.log("touchedsq");
                if(powerup.state == 0)
                 {console.log("gameover");
                  hit.play();
                 }
               }
         }  
}

function shape4(x,y,rad,ang,index)
{

       
       for(let j=0;j<4;j++){
            var a = j*(Math.PI/2);
            ctx.fillStyle = obstacle.col2[j];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            //ctx.lineWidth=5;
            ctx.arc(WIDTH/2,y,8,a,a+Math.PI/2);
            ctx.fill();
            ctx.closePath();
         }

       let ele=obstacle.position[index];
       
       ctx.beginPath();
       ctx.strokeStyle =ele.vannam;
       ctx.lineWidth=13;
       ctx.moveTo(x,y - 60);
       ctx.lineTo(x ,y + 60);
       ctx.stroke();
       ctx.closePath();

       ctx.beginPath();
       ctx.strokeStyle =ele.vannam;
       ctx.lineWidth=13;
       ctx.moveTo(x+40,y - 60);
       ctx.lineTo(x+40,y + 60);
       ctx.stroke();
       ctx.closePath();

       ele.x += obstacle.dx;
       if(ele.x >= 0.65*WIDTH)
       {
        obstacle.dx = -2;
       }

       if(ele.x <= 0.35*WIDTH)
       {
        obstacle.dx= 2;
       }

       if(((ball.x == ele.x) || (ball.x == ele.x + 40)) && ((ball.y >= ele.y-60) && (ball.y <= ele.y+60)))
       {
        if(powerup.state == 0)
        {
            console.log("touched moving grid");
            hit.play();
        }
       }

}


const state = {
    current:0,
    getReady:0,
    game:1,
    over:2
}

document.addEventListener("keydown",function(event){

var key=event.keyCode;
console.log(key);
if(key == 38)
   {
    switch(state.current)
   {
        case 0: state.current = 1;
                break;
       case 1: ball.move();
                break;
        case 3: end.draw();
                break;
    } 
   }
else if (key == 32)
{
    if(toggle == 0)
    {
        state.current=2;
        paused.draw();
        toggle=1;
    }
    else
    {
        toggle=0;
        state.current=1;
    }
}               

});




const end={
    
    draw(){
        
        if(state.current==3)
        {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle="#ff0000";
        ctx.strokeText("Game is Over...Reload The Page",WIDTH/2,HEIGHT/2);
        }
    }
}

const getReady={
    
    draw()
    {
        if(state.current == 0)
        {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle="#ff0000";
        ctx.strokeText("Press Any Button To Start The Game",WIDTH/2,HEIGHT/2);
        }
    }
}

const paused={

    draw()
    {
        if(state.current == 2)
        {
            ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle="#ff0000";
        ctx.strokeText("Game Paused...spacebar to continue",WIDTH/2,HEIGHT/2);
        }
    }
}

const ball = {

    x: WIDTH/2,
    y: 2.8*(HEIGHT/4),
    gravity : 0.1,
    rd:12,
    jump : 2.6,
    clr:ballchange[0],     /////////// rgb is (170,0,255)
    speed : 0,
    jumped:0,
    maxy:0.7*HEIGHT,

draw(){
    
    if(state.current == 1)
    {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.rd,0,Math.PI*2); 
    ctx.strokeStyle=this.clr;
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x,this.y,this.rd,0,Math.PI*2); 
    ctx.fillStyle=this.clr;
    ctx.closePath();
    ctx.fill();
    }
},

move()
{
    this.speed = -this.jump;
    this.jumped += this.jump;
   
},
update()
{
   this.speed += this.gravity;
   this.y += this.speed;
   if(this.y >= 0.85*HEIGHT)
   {
    //state.current=2;
    this.y=0.85*HEIGHT;
   }

    if(this.maxy > this.y)
    {
      this.maxy = this.y;
    }
    
    let y_cord=this.y;
    /*let t=touching((WIDTH/2),y_cord,170,0,255);
    {
        if(t==0)
        {
            state.current=2;
        }
    }*/
},
}

const score =
{
    scr:0,
    best:parseInt(localStorage.getItem("best")) || 0,

    draw()
    {
        if(state.current==1)
        {
            /*ctx.beginPath();
            ctx.font = "40px Arial";
            ctx.lineWidth=2;
            //ctx.textAlign = "center";
            ctx.strokeStyle="#ff0000";
            //ctx.fillText(this.scr,30,50);
            ctx.strokeText("score",100,200);
            ctx.closePath();*/
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "40px Teko";
            ctx.fillText("score", 80, 50);
            ctx.strokeText("score", 80, 50);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "30px Teko";
            ctx.fillText(this.scr, 80, 80);
            ctx.strokeText(this.scr, 80, 80);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "40px Teko";
            ctx.fillText("Best score", 580, 50);
            ctx.strokeText("Best score", 580, 50);
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.font = "30px Teko";
            ctx.fillText(this.best, 580, 80);
            ctx.strokeText(this.best,580, 80);
            ctx.closePath();
        }
    }
}


function draw()
{
   ball.draw();
   getReady.draw();
   end.draw();
   obstacle.draw();
   score.draw();
   paused.draw();
   powerup.draw();
   bcchange.draw();
}

function update()
{
    ball.update();
    powerup.update();
    obstacle.update();
    bcchange.update();
}

function gameLoop(){

ctx.clearRect(0,0,WIDTH,HEIGHT);
frames++;
update();
draw();
//console.log(frames);
requestAnimationFrame(gameLoop);
}

gameLoop();