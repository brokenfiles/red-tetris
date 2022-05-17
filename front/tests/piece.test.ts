import {setup} from "@nuxt/test-utils";
import {fileURLToPath} from "node:url";
import {describe, it, expect} from "vitest";
import {Piece} from "~/classes/Game/Piece.class";

await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
})

describe("Piece", async () => {

    it("should be a L piece", () => {
        const piece = Piece.From("L")
        expect(piece.map.getMultidimensionalMap()).toBe([
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ])
    })

})
