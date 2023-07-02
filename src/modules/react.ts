import React from "react";
import define from "../utils/webpack";

const WebpackModules = define();

// @ts-expect-error
const ReactModule: typeof React = WebpackModules.getByProps("Component", "createElement");

export default ReactModule;