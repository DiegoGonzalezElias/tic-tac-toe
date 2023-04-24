
export const getCleverMoves = (board: Array<Array<string | null>>, player: string, checkWinner: (board:Array<Array<string | null>>) => string | null): [number, number] => {

    const cleverMoves: Array<[number,number]> = [];
    // check winning mover
    board.forEach((row, rowIndex) => {
        row.map((col, colIndex)=> {
            if(!board[rowIndex][colIndex]) {
                const cloneBoard = board.map(r => [...r]);
                cloneBoard[rowIndex][colIndex] = player;
                if(checkWinner(cloneBoard) === player){
                    cleverMoves.unshift([rowIndex, colIndex]);
                }
            }
        })
    });



    //oponent moves
    const opponent = player === "X" ? "O" : "X";

    board.some((row, rowIndex) => row.some((col, colIndex)=>{
        if (!board[rowIndex][colIndex]) {
            const cloneBoard = board.map(r => [...r])
            cloneBoard[rowIndex][colIndex] = opponent;
            if(checkWinner(cloneBoard) === opponent){
                cleverMoves.push([rowIndex,colIndex]);
                return true;
            }
            return false;
        }
    }))

    if(cleverMoves.length > 0) return cleverMoves[0];
    //choose the clever cell

    if(!board[1][1]) return [1,1];

    //random move
    const emptyCells: Array<[number, number]> = []
    board.forEach((row, rowIndex)=>{
        row.forEach((col, colIndex)=>{
            if (!board[rowIndex][colIndex]) {
                emptyCells.push([rowIndex, colIndex]);
            }
        })
    })

    const randomCell = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomCell]
}

