/*-------------- Constants -------------*/
const sqrs = document.querySelectorAll('.sqr');
const columns = document.querySelectorAll('.column');
const board = document.querySelector('board');
const msg = document.querySelector('h2');
const resetB = document.querySelector('button');
const undoB = document.querySelector('#undo');
const numOfRow = 6;
const numOfCol = 7;
/*---------- Variables (state) ---------*/
let boardArr = [];
for (let i = 0; i < 6; i++) {
    let row = [];
    for (let j = 0; j < 7; j++) {
        row.push(0);
    }
    
    boardArr.push(row);
}

let turn = 1;
let win = 0;
let lastPlay = [];
let lastRow = null;
let lastCol = null;
/*----- Cached Element References  -----*/



/*-------------- Functions -------------*/
const play = (event) =>{
   const classOfEvent = event.target.className
   const pressed = classOfEvent.split(' ');
   const eventColS = pressed[1];
   const eventCol = Number(eventColS);
   for(let i = 0 ; i<numOfRow ; i++){

       if((!(boardArr[i][eventCol] == 0))&& i!==0){
          if (!(boardArr[0][eventCol]==0)){break;}
            boardArr[i-1][eventCol] = turn;
            lastTurn = turn;
            lastRow = i-1;
            lastCol = eventCol
            if (turn == 1){
                sqrs[(i-1)+(numOfRow*eventCol)].style.backgroundColor='red';
                msg.innerText = (`blue's turn`);
                win = checkWin(turn , (i-1) , eventCol);
                turn = 2;
            }else{
                sqrs[(i-1)+(numOfRow*eventCol)].style.backgroundColor='blue';
                msg.innerText = (`red's turn`);
                win = checkWin(turn , i-1 , eventCol);
                turn = 1;
            }

            console.log(boardArr)
            break;
       }else if (i === 5){
            boardArr[i][eventCol] = turn;
            lastRow = i;
            lastCol = eventCol
            if (turn == 1){
                sqrs[(i)+(numOfRow*eventCol)].style.backgroundColor='red';
                msg.innerText = (`blue's turn`);
                win = checkWin(turn , i , eventCol);
                turn = 2;
                
            }else{
                sqrs[(i)+(numOfRow*eventCol)].style.backgroundColor='blue';
                msg.innerText = (`red's turn`);
                win = checkWin(turn , i , eventCol);
                turn = 1;
                
            }
            
       }
    }
    
    if (win!==0){
        stop();
    }
    
}

    function checkWin(turn , row , col ){
        //check horizontal
        let count = 0;
        for( let i = (col-3)  ; i<col+4 ; i++ ){
            if(i >= 0 && i < numOfCol){
                if(boardArr[row][i] == turn ){
                    count++;
                    if (count  >= 4){
                        if(turn === 1){
                            msg.innerText = `red won`;
                        }else{
                            msg.innerText = `blue won`;
                        }
                        
                        return turn;
                    }
                }else{
                    count = 0;
                }
            }
           
        }
       

        // check vertical
        count =0;
        for( let i = (row-3)  ; i<row+4 ; i++ ){
            if(i >= 0 && i < numOfRow){
                if(boardArr[i][col] == turn ){
                    count++;
                    if (count  >= 4){
                        if(turn === 1){
                            msg.innerText = `red won`;
                        }else{
                            msg.innerText = `blue won`;
                        }
                        return turn;
                    }
                }else{
                    count = 0;
                }
            }
        }

        //check diagonal up to down 

        count = 0;
        for( let i = (row-3), j = (col-3)  ; i<(row+4) && j<(col+4); i++ , j++ ){
            if((i >= 0 && i < numOfRow) && (j >= 0 && j < numOfCol)){
                if(boardArr[i][j] == turn ){
                    count++;
                    console.log(i+' '+j)
                    if (count  >= 4){
                        if(turn === 1){
                            msg.innerText = `red won`;
                        }else{
                            msg.innerText = `blue won`;
                        }
                        return turn;
                    }
                }else{
                    count = 0;
                }
            }

        }
        // check diagonal down to up
        count = 0 ;
        for( let i = (row+3), j = (col-3)  ; i>row-4 && i<col+4; i-- , j++ ){
            if((i >= 0 && i < numOfRow) && (j >= 0 && j < numOfCol)){
                if(boardArr[i][j] == turn ){
                    count++;
                    if (count  >= 4){
                        if(turn === 1){
                            msg.innerText = `red won`;
                        }else{
                            msg.innerText = `blue won`;
                        }
                        return turn;
                    }
                }else{
                    count = 0;
                }
            }

        }
        return 0;

}

function stop(){
    columns.forEach(column=>column.removeEventListener('click', play));
}



function reset(){
    sqrs.forEach(sqr => sqr.style.backgroundColor='black')
    boardArr = [];
    for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 7; j++) {
            row.push(0);
        }
        
        boardArr.push(row);
    }
    columns.forEach(column=>column.addEventListener('click', play));
    if(turn === 1){
        msg.innerText = `red's turn`;
    }else{
        msg.innerText = `blue's turn`;
    }
}





function undo(){
    if (boardArr[lastRow][lastCol] !== 0){
        if(lastCol !== null && lastRow !== null)
        boardArr[lastRow][lastCol] = 0;
        
        sqrs[(lastRow)+(numOfRow*lastCol)].style.backgroundColor='black';

        if(turn == 1){
            turn=2
            msg.innerText="blue's turn"
        }else {
            turn =1;
            msg.innerText="red's turn"
        }
        if(win != 0){
            columns.forEach(column=>column.addEventListener('click', play));
        }

    }

}
    
    

/*----------- Event Listeners ----------*/
columns.forEach(column=>column.addEventListener('click', play));
resetB.addEventListener('click' , reset);
undoB.addEventListener('click' , undo);

