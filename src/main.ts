import 'pixi.js';
import Sprite = PIXI.Sprite;

let renderer = PIXI.autoDetectRenderer(1040,556,{
    resolution:1
});


let firstColumn:Slot[]=[];
let secondColumn:Slot[]=[];
let thirdColumn:Slot[]=[];
let fourthColumn:Slot[]=[];
let fifthColumn:Slot[]=[];
let slots:any[] = [];
let coordinates:number[]=[];
let size=50;
const slotCount = 11;
const slotWidth=145;
const slotHeight = 139;
let trigger:boolean=false;


let bool:boolean=false;

let count = -slotHeight*5;
for (let i = 0; i <= slotCount; i++) {
    coordinates.push(count);
    count+=slotHeight;
}



let stage= new PIXI.Container();
document.getElementById('display').appendChild(renderer.view);
document.getElementById('btn').addEventListener('click',()=>{slots[0].forEach((s:Slot)=>{s.trigger=false})});
document.getElementById('btn2').addEventListener('click',()=>{slots.forEach(s=>{s.forEach((a:Slot)=>{a.trigger=true;})})});



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




function createSprites(num:number){
    return new Slot(PIXI.loader.resources[num.toString()].texture);
}

function setup(){
     let slotIndex = 15;
     slots.push(firstColumn,secondColumn,thirdColumn,fourthColumn,fifthColumn);
     slots.forEach(s=>{
         for(let i=1;i<=slotCount;i++){
             s.push(createSprites(i));
             s[i-1].width=slotWidth;
             s[i-1].height=slotHeight;
             s[i-1].position.set(slotIndex,coordinates[i]);
             stage.addChild(s[i-1]);
         }
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
    /*play(slots);*/
    renderer.render(stage);
}

function del(){
    slots[0].forEach((s:Slot)=>{
        s.state();
    })
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


    state(){
        if(this.trigger){this.play()}
        else {this.stop()}
    }

    play(){
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




    checkCoord(){
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
                }else{

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






















