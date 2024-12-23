
enum PrimitivePiece {
    Pawn,
    Bishop,
    Knight,
    Rook,
    Queen,
    King,
}

export class Piece {
    
    constructor(private type: PrimitivePiece, private is_white: boolean) { }

    static Pawn(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.Pawn, is_white);
    }
    static Bishop(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.Bishop, is_white);
    }
    static Knight(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.Knight, is_white);
    }
    static Rook(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.Rook, is_white);
    }
    static Queen(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.Queen, is_white);
    }
    static King(is_white: boolean): Piece {
        return new Piece(PrimitivePiece.King, is_white);
    }

    static fromString(str: string): Piece | null {
        if(str.length != 2)
            return;
        if(str === "  ")
            return null;
        str = str.toUpperCase();
        const [color, t] = str.split("");
        const p = new Piece(PrimitivePiece.Bishop, false);
        if(color === "B")
            p.is_white = false;
        else if (color === "W")
            p.is_white = true;
        else
            return null

        switch (t) {
            case "P":
                p.type = PrimitivePiece.Pawn;
                break;
            case "B":
                p.type = PrimitivePiece.Bishop;
                break;
            case "N":
                p.type = PrimitivePiece.Knight;
                break;
            case "R":
                p.type = PrimitivePiece.Rook;
                break;
            case "Q":
                p.type = PrimitivePiece.Queen;
                break;
            case "K":
                p.type = PrimitivePiece.King;
                break;
            default:
                return null;
        }

        return p;
    }

    toString(): string {
        const color = this.is_white ? "W" : "B";
        let t = "P";
        switch (this.type) {
            case PrimitivePiece.Pawn:
                t = "P";
                break;
            case PrimitivePiece.Bishop:
                t = "B";
                break;
            case PrimitivePiece.Knight:
                t =  "N";
                break;
            case PrimitivePiece.Rook:
                t =  "R";
                break;
            case PrimitivePiece.Queen:
                t = "Q";
                break;
            case PrimitivePiece.King:
                t = "K";
                break;
        }
        return color+t;
    }
}

