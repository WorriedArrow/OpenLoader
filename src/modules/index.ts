import React from "./react";
import ReactDOM from "./reactDOM";
import ButtonClasses from "./buttonClasses";
import { WebpackModules } from "../utils/webpack";

export { React, ReactDOM, ButtonClasses };
export function getClassRough(name: string): string | undefined {
    return WebpackModules.getProp(name);
}