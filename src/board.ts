import { Piece } from "./piece";
import { FixedLengthArray } from "./types";

type PrimitiveBoard = FixedLengthArray<FixedLengthArray<(Piece | null), 8>, 8>;

export class Board {
    private board: PrimitiveBoard
    constructor() {
        this.board = primBoard();
    }

    updateFromStr(str: string): boolean {
        let bArr = str.split("\n");
        let rows: string[] = [];
        for(let i = 0; i < bArr.length; i++) {
            if([1, 2, 3, 4, 5, 6, 7, 8].map(x => `${x}`).includes(bArr[i].charAt(0))) {
                rows.push(bArr[i].substring(1).trim());
            }
        }
        if(rows.length != 8) {
            console.log(`invalid input "${str}"`);
            return false;
        }
        const board = [];
        for(let i = 0; i < rows.length; i++) {
            const row: (Piece | null)[] = [];
            rows[i].substring(1, rows[i].length-1).split("|").forEach(p => row.push(Piece.fromString(p.trim())));
            if(row.length != 8){
                console.log(`invalid row ${rows[i]}`)
                return false;
            }
            board.push(row);
        }
        this.board = (board as any) as PrimitiveBoard;
        return true;
    }

    toString(): string {
        let bArr = [" |A |B |C |D |E |F |G |H |"];
        // 
        for(let i = 0; i < this.board.length; i++) {
            bArr.push(" |--|--|--|--|--|--|--|--|")
            let lStr = `${8-i}|`;
            for(let j = 0; j < this.board[i].length; j++) {
                if(this.board[i][j])
                    lStr += this.board[i][j].toString() + "|";
                else
                    lStr += "  |";
            }
            bArr.push(lStr);
        }
        return bArr.join("\n");
    }
}

function primBoard(): PrimitiveBoard {
    return [
        [Piece.Rook(false), Piece.Knight(false), Piece.Bishop(false), Piece.Queen(false), Piece.King(false), Piece.Bishop(false), Piece.Knight(false), Piece.Rook(false)],
        [Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false), Piece.Pawn(false)],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true), Piece.Pawn(true)],
        [Piece.Rook(true), Piece.Knight(true), Piece.Bishop(true), Piece.Queen(true), Piece.King(true), Piece.Bishop(true), Piece.Knight(true), Piece.Rook(true)],
    ]
}
