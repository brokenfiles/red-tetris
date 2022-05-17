import _ from "lodash";
import {PieceFactory} from "~/classes/Game/Piece.factory.class";
import {NoCellsError} from "~/classes/Game/Piece.exceptions";

export type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z"
export type PieceRotationDegree = -90 | 90
export type PieceCoordinate = 0 | 1 | 2 | 3
export interface Dimensions {
    width: number,
    height: number
}
export interface Coordinates {
    x: PieceCoordinate,
    y: PieceCoordinate
}
export interface Cell {
    id: number,
    cellId: number,
    coordinates: Coordinates,
    dimensions: Dimensions,
    style: any,
}

export class Piece {

    static DEFAULT_WIDTH = 70
    static DEFAULT_HEIGHT = 70

    private readonly _map: PieceMap
    private readonly _color: string

    private _width: number
    private _height: number

    static From (type: PieceType) {
        const pieceFactory = new PieceFactory(type)
        return pieceFactory.createPiece()
    }

    constructor(map: PieceMap, color: string) {
        this._map = map
        this._color = color

        this._width = Piece.DEFAULT_WIDTH
        this._height = Piece.DEFAULT_HEIGHT
    }

    rotate(degree: PieceRotationDegree): void {
        this.map.rotate(degree, this)
    }

    /**
     * Returns cells with style associated
     * @param width
     * @param height
     */
    getCells (width?: number, height?: number): Cell[] {
        const w = width ? width : this._width
        const h = height ? height : this._height

        const cells = [] as Cell[]
        let id = 0
        for (let idx = 0; idx < this.map.rawMap.length; idx ++) {
            const cell = this.map.rawMap[idx]
            const coordinates = this._map.getCoordinates(idx)
            // do not add the cell if there is a 0
            if (cell) {
                cells.push({
                    id: id++,
                    cellId: id,
                    coordinates,
                    dimensions: {
                        width: w, height: h
                    },
                    style: {
                        width: w + "px",
                        height: h + "px",
                        top: coordinates.y * w + "px",
                        left: coordinates.x * h + "px",
                        backgroundColor: this._color,
                    }
                })
            }
        }
        return cells
    }

    getDimensions (cells: Cell[]): Dimensions {
        if (cells.length === 0)
            throw new NoCellsError()

        const differenceX =
            Math.max(...cells.map(cell => cell.coordinates.x)) -
            Math.min(...cells.map(cell => cell.coordinates.x)) + 1

        const differenceY =
            Math.max(...cells.map(cell => cell.coordinates.y)) -
            Math.min(...cells.map(cell => cell.coordinates.y)) + 1

        return {
            width: differenceX * cells[0].dimensions.width,
            height: differenceY * cells[0].dimensions.height
        }
    }

    get map (): PieceMap {
        return this._map
    }

    set height (height: number) {
        this._height = height
    }

    set width (width: number) {
        this._width = width
    }

}


export class PieceMap {

    private _rawMap: number[]
    private readonly _mapHeight: number
    private readonly _mapWidth: number

    constructor(rawMap: number[]) {
        this._rawMap = rawMap
        this._mapHeight = 4
        this._mapWidth = 4
    }

    rotate(degree: PieceRotationDegree, piece: Piece): void {

    }

    getCell (x: PieceCoordinate, y: PieceCoordinate): number {
        const realX = x % this._mapWidth
        const realY = y * this._mapWidth
        return this._rawMap[realX + realY]
    }

    getCoordinates (position: number): Coordinates {
        const x = position % this._mapWidth
        const y = Math.ceil((position - x) / this._mapWidth)

        return {
            x: x as PieceCoordinate,
            y: y as PieceCoordinate
        }
    }

    getMultidimensionalMap (): number[][] {
        return _.chunk(this._rawMap, this._mapHeight)
    }

    getSingleDimensionMap (multidimensional: number[][]): number[] {
        let singleDimensionalMap = []
        for (const row of multidimensional) {
            for (const item of row) {
                singleDimensionalMap.push(item)
            }
        }
        return singleDimensionalMap
    }

    private removeZeros(multidimentionalMap: number[][], cells: Cell[]): number[][] {
        const x = Math.min(...cells.map(cell => cell.coordinates.x))
        const y = Math.min(...cells.map(cell => cell.coordinates.y))

        const differenceX =
            Math.max(...cells.map(cell => cell.coordinates.x)) -
            x + 1

        const differenceY =
            Math.max(...cells.map(cell => cell.coordinates.y)) -
            y + 1

        const width = Math.max(differenceX, differenceY)
        const height = width

        const withoutZeros = []
        for (let newY = 0; newY < height; newY ++) {
            withoutZeros.push(multidimentionalMap[newY + y].slice(x, x + width))
        }

        return withoutZeros
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
