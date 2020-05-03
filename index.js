let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let frames=0;
const WIDTH = 700;
const HEIGHT=700;



const obstacle = 
{

position:[{
         		x:WIDTH/2,
         		y:0.4*HEIGHT 
         	}],
col1:['#F39','#3FF','#FF3','#A0F'],        
col2:['#A0F','#F39','#3FF','#FF3'],
col3:['#FF3','#A0F','#F39','#3FF'],
col4:['#3FF','#FF3','#A0F','#F39'],

x: WIDTH/2,
y: 0.4*HEIGHT,
j:0,
rotation:2*Math.PI,

draw()
{
      if(state.current == 1){
         
        for(let i=0;i < this.position.length; i++)
        {
        	let p=this.position[i];

        	shape1(p.x,p.y,90);
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
         	this.position.push({
         		x:WIDTH/2,
         		y:ball.y-0.45*HEIGHT
         	});
            }
         //}

         for(let i=0;i < this.position.length; i++)
         {
         	let p=this.position[i];
         	
            if(ball.jumped > 6)
         	{
         	  //p.y += 35;
              
              for (const el of this.position){

                el.y +=35;

              }


              ball.jumped=0;
            }
         	
         	if(p.y >= HEIGHT)
         	{
         		this.position.shift();
         	}
         }
       }
 }
}


function shape1(x,y,r){
	
       
            //ctx.save();
            //ctx.translate(obstacle.x,obstacle.y);
         for(let i=0;i<4;i++){
            var a = i*Math.PI/2;
            ctx.strokeStyle = obstacle.col1[i];
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

           /* var a = 1*Math.PI/2;
            ctx.strokeStyle = obstacle.col1[1];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            ctx.lineWidth=13;
            ctx.arc(x,y,r,a,a+Math.PI/2);
            ctx.stroke();
            ctx.closePath();

             var a = 2*Math.PI/2;
            ctx.strokeStyle = obstacle.col1[2];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            ctx.lineWidth=13;
            ctx.arc(x,y,r,a,a+Math.PI/2);
            ctx.stroke();
            ctx.closePath();

             var a = 3*Math.PI/2;
            ctx.strokeStyle = obstacle.col1[3];
            //ctx.strokeStyle = "#3ff";
            ctx.beginPath();
            ctx.lineWidth=13;
            ctx.arc(x,y,r,a,a+Math.PI/2);
            ctx.stroke();
            ctx.closePath(); */
        
}

function shape2(){


            ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[0];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x,obstacle.y - 90);
        	ctx.lineTo(obstacle.x - 77.8,obstacle.y + 45);
        	ctx.stroke();
        	ctx.closePath();

        	ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[1];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x -77.8,obstacle.y +45);
        	ctx.lineTo(obstacle.x + 77.8,obstacle.y + 45);
        	ctx.stroke();
        	ctx.closePath();

        	ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[2];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x + 77.8,obstacle.y + 45);
        	ctx.lineTo(obstacle.x,obstacle.y -90);
        	ctx.stroke();
        	ctx.closePath();


}


function shape3(){

            ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[0];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x-90,obstacle.y - 90);
        	ctx.lineTo(obstacle.x - 90,obstacle.y + 90);
        	ctx.stroke();
        	ctx.closePath();

        	ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[1];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x -90,obstacle.y +90);
        	ctx.lineTo(obstacle.x + 90,obstacle.y + 90);
        	ctx.stroke();
        	ctx.closePath();

        	ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[2];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x + 90,obstacle.y +90);
        	ctx.lineTo(obstacle.x +90,obstacle.y -90);
        	ctx.stroke();
        	ctx.closePath();

            ctx.beginPath();
        	ctx.strokeStyle = obstacle.col1[30];
        	ctx.lineWidth=13;
        	ctx.moveTo(obstacle.x + 90,obstacle.y -90);
        	ctx.lineTo(obstacle.x-90,obstacle.y -90);
        	ctx.stroke();
        	ctx.closePath();
}



const state = {
	current:0,
	getReady:0,
	game:1,
	over:2
}

canvas.addEventListener("click",function(event){

	switch(state.current)
	{
		case 0: state.current = 1;
		        break;
	   case 1: ball.move();
	            break;
	    case 2: end.draw();
	            break;
	}             
});

const end={
	
	draw(){
		
        if(state.current==2)
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

const ball = {

    x: WIDTH/2,
    y: 2.8*(HEIGHT/4),
    gravity : 0.1,
    rd:8,
    jump : 2.6,
    clr:"#A0F",
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
}
}


function draw()
{
   ball.draw();
   getReady.draw();
   end.draw();
   obstacle.draw();
}

function update()
{
    ball.update();
    obstacle.update();
}

function gameLoop(){

ctx.clearRect(0,0,WIDTH,HEIGHT);
update();
draw();
frames++;
requestAnimationFrame(gameLoop);
}

gameLoop();