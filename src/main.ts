import 'pixi.js';
import 'create.js';
import Sprite = PIXI.Sprite;

//config
const slotCount:number = 11;
const slotWidth:number=145;
const slotHeight:number = 139;

//Sounds functions
let sound=createjs.Sound;
let soundID:string='Thunder';
let soundLanding1:string='Landing1';

window.onload=loadSound;


let playEvent:Event = new CustomEvent('play');//Customs events for sounds
let playLanding:Event = new CustomEvent('landing');
sound.on("complete",()=>{sound.play(soundID)});
sound.on('play',()=>{sound.play(soundID)});
sound.on('landing',()=>{sound.play(soundLanding1)});


function loadSound():void {
    createjs.Sound.registerSound("images/Reel_Spin.mp3", soundID);
    createjs.Sound.registerSound("images/Landing_1.mp3", soundLanding1);
}


//Pixi config
let firstColumn:Slot[]=[];
let secondColumn:Slot[]=[];
let thirdColumn:Slot[]=[];
let fourthColumn:Slot[]=[];
let fifthColumn:Slot[]=[];
let slots:any[] = [];
let coordinates:number[]=[];
let trigger:boolean=false;

let renderer = PIXI.autoDetectRenderer(1040,556,{
    transparent:true,
    resolution:1
});

getCoordinates(coordinates); //set initial array of coordinates

function getCoordinates(coordinates:number[]):number[]{
    let count:number = -slotHeight*5;
    for (let i = 0; i <= slotCount; i++) {
        coordinates[i]=count;
        count+=slotHeight;
    }
    return coordinates;
}

//PIXI enviroment
let stage = new PIXI.Container();
document.getElementById('display').appendChild(renderer.view);
document.getElementById('btn2').addEventListener('click',testStart);

function testRandom(min:number,max:number):number{
    return Math.floor(Math.random() * (max - min + 1) + min);  //randomize function
}

function testStart():void{
    sound.dispatchEvent(playEvent);
    let image:HTMLImageElement=<HTMLImageElement>document.getElementById("btn2");
    image.src="images/btn_spin_disable.png";
    document.getElementById("btn2").removeEventListener('click',testStart);
    slots.forEach(s=>{s.forEach((a:Slot)=>{a.trigger=true;})});
    setTimeout(()=>{testStop()},4000);
}

function testStop():void{
    setTimeout(()=>{slots[0].forEach((s:Slot)=>{s.trigger=false});sound.dispatchEvent(playLanding)},500);
    setTimeout(()=>{slots[1].forEach((s:Slot)=>{s.trigger=false});sound.dispatchEvent(playLanding)},1000);
    setTimeout(()=>{slots[2].forEach((s:Slot)=>{s.trigger=false});sound.dispatchEvent(playLanding)},1500);
    setTimeout(()=>{slots[3].forEach((s:Slot)=>{s.trigger=false});sound.dispatchEvent(playLanding)},2000);
    setTimeout(()=>{slots[4].forEach((s:Slot)=>{s.trigger=false});sound.dispatchEvent(playLanding)},2500);
    setTimeout(()=>{changeAppearance()},2501);
}

function changeAppearance():void{
    let immage:HTMLImageElement=<HTMLImageElement>document.getElementById('btn2');
    immage.src="images/btn_spin_normal.png";
    document.getElementById("btn2").addEventListener('click',testStart);
}

function getRndCoordinate(arr:number[]):number{  //function for setting a random position of current slot
    let index= testRandom(0,arr.length-2);
    let value= arr[index];
    arr.splice(index,1);
    return value;
}


PIXI.loader.add("1","images/01.png")
    .add("2","images/02.png")
    .add("3","images/03.png")
    .add("4","images/04.png")
    .add("5","images/05.png")
    .add("6","images/06.png")
    .add("7","images/07.png")
    .add("8","images/08.png")
    .add("9","images/09.png")
    .add("10","images/10.png")
    .add("11","images/11.png")
    .load(setup);

    renderer.render(stage);




function createSprites(num:number):Slot{
    return new Slot(PIXI.loader.resources[num.toString()].texture);
}

function setup(){
     let slotIndex:number = 15;
     slots.push(firstColumn,secondColumn,thirdColumn,fourthColumn,fifthColumn);
     slots.forEach(s=>{
         for(let i=1;i<=slotCount;i++){
             s.push(createSprites(i));
             s[i-1].width=slotWidth;
             s[i-1].height=slotHeight;
             s[i-1].position.set(slotIndex,getRndCoordinate(coordinates));
             stage.addChild(s[i-1]);
         }
         getCoordinates(coordinates);
         slotIndex+=215;
     });

        animationLoop();
}

function animationLoop() {

    requestAnimationFrame(animationLoop);
    slots.forEach(s=>{
        s.forEach((a:Slot)=>{
            a.state();
        })
    });

    renderer.render(stage);
}


function play(slots:any[]){

    if(trigger==true){
    slots.forEach((s:Slot[])=>{
        s.forEach((a:Slot)=>{
            a.play();
        })
    });
    }else {
        slots.forEach((s:Slot[])=>{
            s.forEach((a:Slot)=>{
                a.stop();
            })
        });
    }

}

class Slot extends Sprite{
    maxSpeed:number=30;
    x:number;
    y:number;
    vy:number=0;
    trigger:boolean=false;

    constructor(arg:any){
        super(arg);
    }


    state():void{
        if(this.trigger){this.play()}
        else {this.stop()}
    }

    play():void{
        if(this.vy<this.maxSpeed){
            this.vy+=1;
            this.y+=this.vy;
        }else {
            this.y+=this.vy;
        }

        if(this.y>=coordinates[11]){
            let overCome = this.y-coordinates[11];
            this.y=coordinates[0]+overCome;
        }

    }

    checkCoord():void{
        if(coordinates.some(s=>{return s==this.y})){

        }
        else {
            for(let i=0;i<=10;i++){
                if(this.y> coordinates[i] && this.y<coordinates[i+1]){
                    if(Math.abs(coordinates[i]-this.y)<Math.abs(coordinates[i+1]-this.y)){
                        this.y=coordinates[i];
                    }else {
                        this.y=coordinates[i+1];
                    }
                }
            }
            if(this.y>coordinates[11]){
                this.y=coordinates[11];
            }
            if(this.y<coordinates[0]){
                this.y=coordinates[11]
            }
        }
    }

    stop(){
            this.checkCoord();
    }

}






















