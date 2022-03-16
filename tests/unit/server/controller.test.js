import { 
    jest, 
    expect, 
    describe, 
    test,
    beforeEach,
} from "@jest/globals"
import config from "../../../server/config.js"
import { Controller } from "../../../server/controller.js"
import { Service } from "../../../server/service.js"
import { handler } from "../../../server/routes.js"
import TestUtil from "../_util/testUtil.js"

const {pages} = config

describe("#Controller - test the paging", () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    test("constructor - should build an new Service object", async () => {
        const type = ".html"
        const mockFileStream = TestUtil.generateReadableStream(['data'])
        const jestMock = jest.spyOn(
            Service.prototype,
            Service.prototype.getFileStream.name, 
            ).mockResolvedValue({
                stream: mockFileStream,
                type: type
        })
        
        const controller = new Controller()
        await controller.getFileStream(pages.homeHTML)

        expect(jestMock).toHaveBeenCalledWith(pages.homeHTML)
        // expect(mockFileStream.pipe).toHaveBeenCalledWith(params.response)
    })


})