// @ts-nocheck

import { WebpackModules } from "../main";

export default class ButtonClasses {
    static get Colors() {
        return WebpackModules.getModule(m => m.BorderColors, {
            searchExports: true
        }).Colors
    }
    static get Looks() {
        return WebpackModules.getModule(m => m.BorderColors, {
            searchExports: true
        }).Looks
    }
}