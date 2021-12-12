const SIZE = 1000;
const OBJECTS = [];
const SPEED = 0.02;
const FISHES = [];
const FINGERLINGS = [];
const PLANKTONS = [];

function main(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	//Forcing the canvas to have equal width and height
	canvas.width=SIZE;
	canvas.height=SIZE;

	//Defining the actual size of our canvas
	ctx.scale(SIZE, SIZE);

	//Adding Objects to the Scene on the Canvas
	// OBJECTS.push(new Fish([0.10,0.9], 0.4));
	FISHES.push(new Fish([0.3,0.9], 0.4));
	// FINGERLINGS.push(new Fish([0.3,0.9], 0.4));

	PLANKTONS.push(new Plankton([0.0,0.7],-0.3, 0.10));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.1,0.7],0.1, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.2,0.7],0.0, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.3,0.7],-0.1, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.4,0.7],0.0, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.5,0.7],0.1, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.6,0.7],-0.1, -0.02));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.8,0.7],-0.2, -0.05));//location, y start pos, x end position
	PLANKTONS.push(new Plankton([0.95,0.7],-0.0, -0.00));//location, y start pos, x end position
	

	removeOverlay();
	//Animate
	setInterval(animate, 100);//Draw Scene every 100millis
}

//Function for Animation
function animate(){
	let probability = Math.random();
	
	if (probability < 0.02) {
		let y = 0.4+(Math.random()/1.8);//Y coordinate for the fishes highest level in the water
		// let y = 0.4+(Math.random()/1.8);//Y coordinate for the fishes highest level in the water

		FISHES.push(new Fish([1.1, y], Math.random()*0.15+0.3, getFishColor()));//location x,y, scale, body color
	}else if(probability >0.2 && probability < 0.25){//Produce little fishes
		let y = 0.6+Math.random();//Y coordinate for the fishes highest level in the water
		FINGERLINGS.push(new Fish([-0.5,y], 0.2, getFishColor()));//location x,y, scale, body color
	}
	//Move fish
	for(let i=0; i<FISHES.length; i++){
		FISHES[i].location[0]-=SPEED*Math.random()*0.9;
		// if(FISHES[i].location[0]<FISHES[i].scale*0.2){ //If fish goes beyond a certain location
		if(FISHES[i].location[0]<-FISHES[i].scale*0.8){ //If fish goes beyond a certain location
			FISHES.splice(i, 1); //Removing 1 element at index i
			i--;
		}
	}
	//Move small fish
	for(let i=0; i<FINGERLINGS.length; i++){
		FINGERLINGS[i].location[0]+=SPEED*Math.random()*0.99;
		//
		if(FINGERLINGS[i].location[0]>1.5){ //If fish goes beyond a certain location
			FINGERLINGS.splice(i, 1); //Removing 1 element at index i
			i--;
		}
	}

	//Draw
	drawScene();
}

//Draw everything in view
function drawScene(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	//Draw Scene FISH
	for(let i=0; i<FISHES.length; i++){
		FISHES[i].draw(ctx,1);//context, -1 means flip fish
	}
	//Draw SMALL FISH
	for(let i=0; i<FINGERLINGS.length; i++){
		FINGERLINGS[i].draw(ctx,-1);//context, -1 means flip fish
	}

	// Giving our work some nice background
	drawBackground(ctx);

	for(let i=0; i<PLANKTONS.length; i++){
		PLANKTONS[i].draw(ctx);
	}

}


// Giving our work some nice background
function drawBackground(ctx){
	//Top
	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.rect(0,0,1,1*0.3);
	ctx.fill();

	//Bottom half
	ctx.beginPath();
	ctx.fillStyle = "rgba(100,200,200,0.8)";
	ctx.rect(0,0.3,1,0.7);
	ctx.fill();

	ctx.save();
	// ctx.beginPath();
	ctx.lineWidth = 0.0009
	// ctx.fillStyle = "red";
	ctx.font = '0.09px Times New Roman';
	ctx.strokeText("David's Aquarium...", 0.1,0.1);
	ctx.font = '0.05px Times New Roman';
// 	ctx.strokeText("Staging & Follow through/Overlapping Action", 0.04,0.2);
	ctx.restore();
}
//Creating sky color
function getFishColor(){
	return getRandomFishColor();
}
//Gen. random sky color
function getRandomFishColor(){
	let colors = ["brown", "magenta", "gray", "green"];
	let max = 3; //Setting the range of possible values
	let min = 0;
	let color = 0;

	color = Math.floor(Math.random() * (max - min +1)) + min;
	return colors[color]; //Get random color from our list
}

//Creating a func to get rand color
function getRandomColor(){
	let red = Math.floor(Math.random()*255);
	let green = Math.floor(Math.random()*255);
	let blue = Math.floor(Math.random()*255);
	return "rgba("+red+","+green+","+blue+",1)";
}


//Creating a Fish class
class Fish{
	constructor(loc, scale, bodyColor){//Scale specifies the size of the drawing
		this.location = loc;
		this.scale = scale;
		this.bodyColor = bodyColor;
	}

	draw(ctx,flip=1){
		
		ctx.lineWidth=0.01;
		ctx.beginPath();
		
		ctx.save();//Store current context coordinates
		ctx.translate(this.location[0], this.location[1]); //Translate to specify which portion of the context to offset our drawing
		ctx.scale(this.scale*flip, this.scale); //We specify the actual size of the drawing

		//Main body
		ctx.fillStyle=this.bodyColor;
		ctx.beginPath();
		ctx.moveTo(-0.2,-0.1);
		ctx.lineTo(+0.25,-0.27);
		ctx.lineTo(+0.7,-0.05);
		ctx.lineTo(+0.7,-0.25);
		ctx.lineTo(+0.25,-0.02);
		ctx.lineTo(-0.2,-0.1);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		//Top fin
		// ctx.fillStyle="red";
		ctx.beginPath();
		ctx.moveTo(+0.02,-0.19);
		ctx.lineTo(+0.06,-0.25);
		ctx.lineTo(+0.21,-0.32);
		ctx.lineTo(+0.16,-0.24);
		// ctx.closePath();
		ctx.stroke();
		// ctx.fill();
		//Fin Lines
		ctx.beginPath();
		ctx.moveTo(+0.06,-0.20);
		ctx.lineTo(+0.12,-0.28);
		ctx.lineTo(+0.165,-0.30);
		ctx.lineTo(+0.10,-0.21);
		ctx.stroke();


		//Bottom fin
		ctx.fillStyle="grey";
		ctx.beginPath();
		ctx.moveTo(+0.05,-0.05);
		ctx.lineTo(+0.10,+0.00);
		ctx.lineTo(+0.17,-0.03);
		ctx.stroke();
		// ctx.fill();
		//Fin Lines
		ctx.beginPath();
		ctx.moveTo(+0.08,-0.045);
		ctx.lineTo(+0.14,-0.01);
		ctx.stroke();

		//Middle fin
		ctx.fillStyle="grey";
		ctx.beginPath();
		ctx.moveTo(+0.13,-0.07);
		ctx.lineTo(+0.19,-0.11);
		ctx.lineTo(+0.25,-0.07);
		ctx.lineTo(+0.19,-0.04);
		ctx.lineTo(+0.13,-0.07);
		ctx.stroke();
		// ctx.fill();
		//Fin Lines
		ctx.beginPath();
		ctx.moveTo(+0.16,-0.09);
		ctx.lineTo(+0.22,-0.055);
		ctx.stroke();

		//Eye
		ctx.fillStyle = "grey";
		ctx.beginPath();
		ctx.arc(-0.01,-0.15, 0.02, 0, 2*Math.PI); //x,y center point, radius, start angle in rads, end angle in rads
		ctx.stroke();
		// ctx.fill(); //Applying color

		//Lateral line
		ctx.setLineDash([0.04, 0.04]);/*dashes are 5px and spaces are 3px*/
		ctx.beginPath();
		ctx.moveTo(+0.05,-0.14);
		ctx.lineTo(+0.4,-0.14);
		ctx.stroke();

		ctx.restore();
	}

}

class Plankton{
	constructor(loc,y1,x2){//Scale specifies the size of the drawing
		this.location = loc;
		// this.scale = scale;
		this.y1 = y1;//The Y Start position of the curve
		this.x2 = x2;//The X End position of the curve

	} draw(ctx){
		var x1 = (Math.random()-0.1)*0.03;
		var cpx1 = (Math.random()-0.1)*0.01;
		var cpx2 = (Math.random()-0.1)*0.01;
		ctx.lineWidth=0.003; 
		ctx.beginPath();
		
		ctx.save();//Store current context coordinates
		ctx.translate(this.location[0], this.location[1]); //Translate to specify which portion of the context to offset our drawing
		// ctx.scale(this.scale, this.scale); //We specify the actual size of the drawing

		//Main body
		ctx.fillStyle="green";
		ctx.strokeStyle = "rgba(0,140,0,1)";
		ctx.beginPath();
		ctx.moveTo(x1,this.y1);
		// ctx.moveTo(0.1,-0.3);
		ctx.bezierCurveTo(cpx1,0.1,cpx2,0.2,this.x2,0.4);
		
		ctx.stroke();
		// ctx.fill();

		ctx.restore();
	}
	swing(){//Trying to swing plankton

	}
}



function removeOverlay(){
	let element = document.getElementById("overlay")
	element.style.display="none";
}
