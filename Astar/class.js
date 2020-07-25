function spot(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.wall = false;
    if(random(1)<0.5){
        this.wall = true;
    }
    this.neighbours = [];
    this.previous = undefined;
    this.show = function(col){
        if(this.wall){
            fill(0);
            rect(this.i*w,this.j*h,w,h);
        } else {
            fill(col);
            rect(this.i*w,this.j*h,w,h);
        }
    }

    this.addNeighbours = function(grid){
//straight path        
    if(i>0){
        this.neighbours.push(grid[this.i-1][this.j]);
    }
    if(i<cols-1){
        this.neighbours.push(grid[this.i+1][this.j]);
    }
    if(j>0){
        this.neighbours.push(grid[this.i][this.j-1]);
    }
    if(j<rows-1){
        this.neighbours.push(grid[this.i][this.j+1]);
    }
//diagonals
    if(i>0 && j>0){
        this.neighbours.push(grid[this.i-1][this.j-1]);
    }
    if(i<cols-1 && j<rows-1){
        this.neighbours.push(grid[this.i+1][this.j+1]);
    }
    if(i>0 && j<rows-1){
        this.neighbours.push(grid[this.i-1][this.j+1]);
    }
    if(i<cols-1 && j>0){
        this.neighbours.push(grid[this.i+1][this.j-1]);
    }  
 }

}