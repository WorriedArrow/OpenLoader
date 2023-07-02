import ReactDOM from "react-dom";
import define from "../utils/webpack";

const WebpackModules = define();

// @ts-expect-error
const ReactDOMModule: typeof ReactDOM = WebpackModules.getByProps("Component", "createElement");

export default ReactDOMModule;