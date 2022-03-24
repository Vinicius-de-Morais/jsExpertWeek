import { jest, expect, describe, test, beforeEach } from "@jest/globals"
import { JSDOM } from "jsdom"
import View from "../../../public/controller/js/view.js"

describe("#View - test suite for presentation layer", () => {
    const dom = new JSDOM()
    global.document = dom.window.document
    global.window = dom.window

    function makeBtnElement({
        text,
        classList
    } = {
        text: '',
        classList: {
            add: jest.fn(),
            remove: jest.fn()
        }
    }){

        return {
            onclick: jest.fn(),
            classList,
            innerText: text
        }
    }

    beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
        jest.spyOn(
            document,
            "getElementById"
        ).mockReturnValue(makeBtnElement())

    })

    test("#changeCommandVisibility - given hide=true it should add unassigned class and reset onClick", () => {
        const button = makeBtnElement()
        const view = new View()
        jest.spyOn(
            document,
            "querySelectorAll"
        ).mockReturnValue([button])
        
        view.changeCommandVisibility()
        expect(button.classList.add).toHaveBeenCalledWith("unassigned")
        expect(button.onclick.name).toStrictEqual("onClickReset")

        expect(() => button.onclick()).not.toThrow()
    })

    test("#changeCommandVisibility - given hide=false it should remove unassigned class and reset onClick", () => {
        const button = makeBtnElement()
        const view = new View()
        jest.spyOn(
            document,
            "querySelectorAll"
        ).mockReturnValue([button])
        
        view.changeCommandVisibility(false)

        expect(button.classList.add).not.toHaveBeenCalled()
        expect(button.classList.remove).toHaveBeenCalledWith("unassigned")
        expect(button.onclick.name).toStrictEqual("onClickReset")

        expect(() => button.onclick()).not.toThrow()
    })
    test("#onLoad", () => {
        const view = new View()

        jest.spyOn(
            view,
            view.changeCommandVisibility.name
        ).mockReturnValue()

        view.onLoad()

        expect(view.changeCommandVisibility).toHaveBeenCalled()
    })
})