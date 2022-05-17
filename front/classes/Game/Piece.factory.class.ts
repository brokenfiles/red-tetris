import {Piece, PieceMap, PieceType} from "~/classes/Game/Piece.class";
import {UndefinedTypeError} from "~/classes/Game/Piece.exceptions";

export class PieceFactory {

    private readonly _map: PieceMap
    private readonly _type: PieceType
    private _color: string

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
                this._color = "#ffbe0b"
                break
            case "J":
                rawMap = [
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#fb5607"
                break
            case "L":
                rawMap = [
                    1, 0, 0, 0,
                    1, 0, 0, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#ff006e"
                break
            case "O":
                rawMap = [
                    1, 1, 0, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#8338ec"
                break
            case "S":
                rawMap = [
                    0, 1, 1, 0,
                    1, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#3a86ff"
                break
            case "T":
                rawMap = [
                    1, 1, 1, 0,
                    0, 1, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#588157"
                break
            case "Z":
                rawMap = [
                    1, 1, 0, 0,
                    0, 1, 1, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
                this._color = "#780000"
                break
            default:
                throw new UndefinedTypeError
        }
        return new PieceMap(rawMap)
    }

    createPiece (): Piece {
        return new Piece(this._map, this._color)
    }

}
