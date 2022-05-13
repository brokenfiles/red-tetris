import _ from "lodash";
import {PieceFactory} from "~/classes/Game/Piece.factory.class";

export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z"
export type PieceCoordinate = 0 | 1 | 2 | 3
export interface Coordinates {
    x: PieceCoordinate,
    y: PieceCoordinate
}
export interface Cell {
    id: number,
    coordinates: Coordinates
    style: any,
}

export class Piece {

    private readonly _map: PieceMap

    static From (type: PieceType) {
        const pieceFactory = new PieceFactory(type)
        return pieceFactory.createPiece()
    }

    constructor(map: PieceMap) {
        this._map = map
    }

    /**
     * Returns cells with style associated
     * @param width
     * @param height
     * @param color
     */
    getCases (width: number, height: number, color: string) {
        const cells = [] as Cell[]
        for (let idx = 0; idx < this.map.rawMap.length; idx ++) {
            const cell = this.map.rawMap[idx]
            const coordinates = this._map.getCoordinates(idx)
            cells.push({
                id: idx,
                coordinates,
                style: {
                    width: width + "px",
                    height: height + "px",
                    top: idx * width + "px",
                    left: "",
                    color,
                }
            })
        }
    }

    get map (): PieceMap {
        return this._map
    }

}


export class PieceMap {

    private readonly _rawMap: number[]
    private readonly _mapHeight: number
    private readonly _mapWidth: number

    constructor(rawMap: number[]) {
        this._rawMap = rawMap
        this._mapHeight = 4
        this._mapWidth = 4
    }

    getCell (x: PieceCoordinate, y: PieceCoordinate): number {
        const realX = x % this._mapWidth
        const realY = y * this._mapWidth
        return this._rawMap[realX + realY]
    }

    getCoordinates (position: number): Coordinates {
        const x = position % this._mapWidth
        const y = Math.ceil(position / this._mapWidth)
        return {
            x: x as PieceCoordinate,
            y: y as PieceCoordinate
        }
    }

    getMultidimensionalMap (): number[][] {
        return _.chunk(this._rawMap, this._mapHeight)
    }

    get rawMap (): number[] {
        return this._rawMap
    }

    get height (): number {
        return this._mapHeight
    }

    get width (): number {
        return this._mapWidth
    }

}
