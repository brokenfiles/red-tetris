export class UndefinedTypeError extends Error {
    constructor() {
        super("This piece type does not exist");
    }
}

export class NoCellsError extends Error {
    constructor() {
        super("No cells specified");
    }
}
