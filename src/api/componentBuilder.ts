import { OpenLoader } from "../main";

export default class ComponentBuilder {
    createComponent(component: Function, options = {}): HTMLElement {
        if(!component) throw new Error("Unknown component: " + component);
        return component(options);
    }
    createMethod(category: string, methodName: string, method: Function, createCategory = true) {
        var subCategory = "";
        if(category.split(".").length > 1) subCategory = category.split(".")[1];
        if((!OpenLoader.components[category] || !OpenLoader.components[category][subCategory]) && !createCategory) throw new Error("Category not found: " + category + ". Please use createCategory = true to automatically create the category.");
        if(!OpenLoader.components[category]) OpenLoader.components[category] = {};
        if(!OpenLoader.components[category][subCategory]) OpenLoader.components[category][subCategory] = {};
        if(subCategory) OpenLoader.components[category][subCategory][methodName] = method;
        else OpenLoader.components[category][methodName] = method;
    }
    parseHTML(html: string, fragment = false) {
        const template = document.createElement("template");
        template.innerHTML = html;
        const node = template.content.cloneNode(true);
        if (fragment) return node;
        return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
    }
}