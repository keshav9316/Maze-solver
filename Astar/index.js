let w,h;
var cols=20;
var rows = 20;
var openSet = [];
var closedSet = [];
var start,end;
var path = [];
var grid = new Array(cols);

function astar(openSet,closedSet,end){
    var winner= 0;
    for(let i =0;i<openSet.length;i++){
        if(openSet[i].f < openSet[winner].f){
            winner = i;
        }
    }
    var current = openSet[winner];

    if(current == end){
        console.log("success!");
        noLoop();
        //backtracking
        path = [];
        var temp = current; // !important else end point will not be marked
        path.push(temp);
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }
    }
    closedSet.push(current);
    openSet.splice(winner,1);

    for(let x = 0; x < current.neighbours.length ; x++){
        if(!closedSet.includes(current.neighbours[x]) && !current.neighbours[x].wall){
            var d = dist(current.i,current.j,current.neighbours[x].i,current.neighbours[x].j);
            var tempg = current.g + d;

            let newPath = false;
            if(openSet.includes(current.neighbours[x])){
                if(tempg < current.neighbours[x].g){
                    current.neighbours[x].g = tempg;
                    newPath = true;
                }
            } else {
                current.neighbours[x].g = tempg;
                openSet.push(current.neighbours[x]);
                newPath = true;
            }
            
            if( newPath == true){
                current.neighbours[x].h = dist(current.neighbours[x].i,current.neighbours[x].j,end.i,end.j);
                current.neighbours[x].f = current.neighbours[x].g + current.neighbours[x].h;
                current.neighbours[x].previous = current;
            }

        }
        
    }

}


function setup(){
createCanvas(600,600);
for (let i=0;i<cols;i++){
 grid[i] = new Array(rows);
}
for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
        grid[i][j] = new spot(i,j);
    }
}

for(let i=0;i<cols;i++){
    for(let j=0;j<rows;j++){
        grid[i][j].addNeighbours(grid);
    }
}

start = grid[0][0];
end = grid[cols-1][rows-1];
openSet.push(start);
start.wall = false;
end.wall = false;

w=width/cols;
h=height/rows;

}

function draw(){
    background(0);
 if(openSet.length>0){
     astar(openSet,closedSet,end);
 }else{
    // stroke(0);
   //  text("NO SOLUTION",0,height+1);
     console.log('NO SOLUTION');
     noLoop();
 }
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            grid[i][j].show(color(255,255,255));
        }
    }

    for(let i=0;i<openSet.length;i++){
        openSet[i].show(color(0,255,0));
    }

    for(let i=0;i<closedSet.length;i++){
        closedSet[i].show(color(255,0,0));
    }

    //display path
    for(let i=0;i<path.length;i++){
        path[i].show(color(0,0,255));
    }

    //display path line
    beginShape();
    for(let i=0;i<path.length;i++){
        stroke(255);
        noFill();
        vertex((path[i].i)*w,(path[i].j)*h);
    }
    endShape();
}
