import {Piece, PieceMap, PieceType} from "~/classes/Game/Piece.class";
import {UndefinedTypeError} from "~/classes/Game/Piece.exceptions";

export class PieceFactory {

    private readonly _map: PieceMap
    private readonly _type: PieceType

    constructor(type: PieceType) {
        this._type = type
        this._map = this.getPieceMap()
    }

    /**
     * Returns the PieceMap class from a PieceType
     */
    public getPieceMap (): PieceMap {
        let rawMap = null
        switch (this._type) {
            case "I":
                rawMap = [
                    1, 0, 0, 0,
                    1, 0, 0, 0,
                    1, 0, 0, 0,
                    1, 0, 0, 0
                ]
                break
            case "J":
                rawMap = [
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    1, 1, 0, 0
                ]
                break
            case "L":
                rawMap = [
                    1, 0, 0, 0,
                    1, 0, 0, 0,
                    1, 0, 0, 0,
                    1, 1, 0, 0
                ]
                break
            case "O":
                rawMap = [
                    1, 1, 0, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                break
            case "S":
                rawMap = [
                    0, 1, 1, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                break
            case "T":
                rawMap = [
                    1, 1, 1, 0,
                    0, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                break
            case "Z":
                rawMap = [
                    1, 1, 0, 0,
                    0, 1, 1, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                break
            default:
                throw new UndefinedTypeError
        }
        return new PieceMap(rawMap)
    }

    createPiece (): Piece {
        return new Piece(this._map)
    }

}
