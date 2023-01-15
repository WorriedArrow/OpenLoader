/**
 * The following code has been created by the wonderful team at BetterDiscord.
 * 
 * Check out their mod [here](https://betterdiscord.app)!
 * 
 * Note that I have personally modified this code to work with TypeScript, however most of it has remained unchanged.
 */

export class Filters {
    static byProps(props: string | any[], filter = (m: any) => m) {
        return (module: any) => {
            if (!module) return false;
            if (typeof(module) !== "object" && typeof(module) !== "function") return false;
            const component = filter(module);
            if (!component) return false;
            for (let p = 0; p < props.length; p++) {
                if (!(props[p] in component)) return false;
            }
            return true;
        };
    }

    static byPrototypeFields(fields: string | any[], filter = (m: any) => m) {
        return (module: any) => {
            if (!module) return false;
            if (typeof(module) !== "object" && typeof(module) !== "function") return false;
            const component = filter(module);
            if (!component) return false;
            if (!component.prototype) return false;
            for (let f = 0; f < fields.length; f++) {
                if (!(fields[f] in component.prototype)) return false;
            }
            return true;
        };
    }

    static byRegex(search: { [Symbol.search](string: string): number; }, filter = (m: any) => m) {
        return (module: any) => {
            const method = filter(module);
            if (!method) return false;
            let methodString = "";
            try {methodString = method.toString([]);}
            catch (err) {methodString = method.toString();}
            return methodString.search(search) !== -1;
        };
    }

    static byStrings(...strings: any[]) {
        return (module: { toString: (arg0: any) => string; }) => {
            if (!module?.toString || typeof(module?.toString) !== "function") return; 
            let moduleString = "";
            try {moduleString = module?.toString([]);}
            catch (err) {moduleString = module?.toString(undefined);}
            if (!moduleString) return false; 
            for (const s of strings) {
                if (!moduleString.includes(s)) return false;
            }
            return true;
        };
    }

    static byDisplayName(name: any) {
        return (module: { displayName: any; }) => {
            return module && module.displayName === name;
        };
    }

    static combine(...filters: any[]) {
        return (module: any) => {
            return filters.every(filter => filter(module));
        };
    }
}


const hasThrown = new WeakSet();

const wrapFilter = (filter: Function) => (exports: any, module: any, moduleId: any) => {
    try {
        if (exports?.default?.remove && exports?.default?.set && exports?.default?.clear && exports?.default?.get && !exports?.default?.sort) return false;
        if (exports.remove && exports.set && exports.clear && exports.get && !exports.sort) return false;
        if (exports?.default?.getToken || exports?.default?.getEmail || exports?.default?.showToken) return false;
        if (exports.getToken || exports.getEmail || exports.showToken) return false;
        return filter(exports, module, moduleId);
    }
    catch (err) {
        hasThrown.add(filter);
        return false;
    }
};

export class WebpackModules {
    static listeners: Set<any>;
    static _require: any;
    static __ORIGINAL_PUSH__: any;
    static find(filter: any, first = true) {return this.getModule(filter, {first});}
    static findAll(filter: any) {return this.getModule(filter, {first: false});}
    static findByUniqueProperties(props: any, first = true) {return first ? this.getByProps(...props) : this.getAllByProps(...props);}
    static findByDisplayName(name: any) {return this.getByDisplayName(name);}
    static getModule(filter: any, options: any = {}) {
        const {first = true, defaultExport = true, searchExports = false} = options;
        const wrappedFilter = wrapFilter(filter);
        const modules = this.getAllModules();
        const rm = [];
        const indices = Object.keys(modules);
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const {exports} = module;
            if (!exports || exports === window || exports === document.documentElement) continue;
            if (typeof(exports) === "object" && searchExports) {
                for (const key in exports) {
                    let foundModule = null;
                    const wrappedExport = exports[key];
                    if (!wrappedExport) continue;
                    if (wrappedFilter(wrappedExport, module, index)) foundModule = wrappedExport;
                    if (!foundModule) continue;
                    if (first) return foundModule;
                    rm.push(foundModule);
                }
            }
            else {
                let foundModule = null;
                if (exports.Z && wrappedFilter(exports.Z, module, index)) foundModule = defaultExport ? exports.Z : exports;
                if (exports.ZP && wrappedFilter(exports.ZP, module, index)) foundModule = defaultExport ? exports.ZP : exports;
                if (exports.__esModule && exports.default && wrappedFilter(exports.default, module, index)) foundModule = defaultExport ? exports.default : exports;
                if (wrappedFilter(exports, module, index)) foundModule = exports;
                if (!foundModule) continue;
                if (first) return foundModule;
                rm.push(foundModule);
            }
        }
        return first || rm.length == 0 ? undefined : rm;
    }

    static getBulk(...queries: any[]) {
        const modules = this.getAllModules();
        const returnedModules = Array(queries.length);
        const indices = Object.keys(modules);
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const {exports} = module;
            if (!exports || exports === window || exports === document.documentElement) continue;
            for (let q = 0; q < queries.length; q++) {
                const query = queries[q];
                const {filter, first = true, defaultExport = true, searchExports = false} = query;
                if (first && returnedModules[q]) continue; 
                if (!first && !returnedModules[q]) returnedModules[q] = []; 
                const wrappedFilter = wrapFilter(filter);
                if (typeof(exports) === "object" && searchExports) {
                    for (const key in exports) {
                        let foundModule = null;
                        const wrappedExport = exports[key];
                        if (!wrappedExport) continue;
                        if (wrappedFilter(wrappedExport, module, index)) foundModule = wrappedExport;
                        if (!foundModule) continue;
                        if (first) returnedModules[q] = foundModule;
                        else returnedModules[q].push(foundModule);
                    }
                }
                else {
                    let foundModule = null;
                    if (exports.Z && wrappedFilter(exports.Z, module, index)) foundModule = defaultExport ? exports.Z : exports;
                    if (exports.ZP && wrappedFilter(exports.ZP, module, index)) foundModule = defaultExport ? exports.ZP : exports;
                    if (exports.__esModule && exports.default && wrappedFilter(exports.default, module, index)) foundModule = defaultExport ? exports.default : exports;
                    if (wrappedFilter(exports, module, index)) foundModule = exports;
                    if (!foundModule) continue;
                    if (first) returnedModules[q] = foundModule;
                    else returnedModules[q].push(foundModule);
                }
            }
        }
        return returnedModules;
    }
    static getModules(filter: any) {return this.getModule(filter, {first: false});}
    static getByDisplayName(name: any) {
        return this.getModule(Filters.byDisplayName(name));
    }
    static getByRegex(regex: any, first = true) {
        return this.getModule(Filters.byRegex(regex), {first});
    }
    static getByPrototypes(...prototypes: any[]) {
        return this.getModule(Filters.byPrototypeFields(prototypes));
    }
    static getAllByPrototypes(...prototypes: any[]) {
        return this.getModule(Filters.byPrototypeFields(prototypes), {first: false});
    }
    static getByProps(...props: any[]) {
        return this.getModule(Filters.byProps(props));
    }
    // OL start
    static getProp(prop: string) {
        return this.getByProps(prop)?.[prop];
    }
    // OL end
    static getAllByProps(...props: any[]) {
        return this.getModule(Filters.byProps(props), {first: false});
    }
    static getByString(...strings: string[]) {
        return this.getModule(Filters.byStrings(...strings));
    }
    static getAllByString(...strings: string[]) {
        return this.getModule(Filters.byStrings(...strings), {first: false});
    }
    static getLazy(filter: any, options: any = {}) {
        const {signal: abortSignal, defaultExport = true, searchExports = false} = options;
        const fromCache = this.getModule(filter, {defaultExport, searchExports});
        if (fromCache) return Promise.resolve(fromCache);
        const wrappedFilter = wrapFilter(filter);
        return new Promise<void>((resolve) => {
            const cancel = () => this.removeListener(listener);
            const listener = function(exports: any) {
                if (!exports || exports === window || exports === document.documentElement) return;
                let foundModule = null;
                if (typeof(exports) === "object" && searchExports) {
                    for (const key in exports) {
                        foundModule = null;
                        const wrappedExport = exports[key];
                        if (!wrappedExport) continue;
                        if (wrappedFilter(wrappedExport, undefined, undefined)) foundModule = wrappedExport;
                    }
                }
                else {
                    if (exports.Z && wrappedFilter(exports.Z, undefined, undefined)) foundModule = defaultExport ? exports.Z : exports;
                    if (exports.ZP && wrappedFilter(exports.ZP, undefined, undefined)) foundModule = defaultExport ? exports.ZP : exports;
                    if (exports.__esModule && exports.default && wrappedFilter(exports.default, undefined, undefined)) foundModule = defaultExport ? exports.default : exports;
                    if (wrappedFilter(exports, undefined, undefined)) foundModule = exports;
                }
                if (!foundModule) return;
                cancel();
                resolve(foundModule);
            };
            this.addListener(listener);
            abortSignal?.addEventListener("abort", () => {
                cancel();
                resolve();
            });
        });
    }
    static get require() {
        if (this["_require"]) return this["_require"];
        const id = "ol-webpackmodules";
        let __discord_webpack_require__: any = {};
        if (typeof(window["webpackJsonp"]) !== "undefined") {
            __discord_webpack_require__ = window["webpackJsonp"].push([[], {
                [id]: (module: { exports: any; }, exports: any, __internal_require__: any) => module.exports = __internal_require__
            }, [[id]]]);
        }
        else if (typeof(window[this.chunkName]) !== "undefined") {
            window[this.chunkName].push([[id], 
                {},
                (                __internal_require__: any) => __discord_webpack_require__ = __internal_require__
            ]);
        }

        delete __discord_webpack_require__.m[id];
        delete __discord_webpack_require__.c[id];
        return this._require = __discord_webpack_require__;
    }
    static getAllModules() {
        return this.require.c;
    }
    static get chunkName() {return "webpackChunkdiscord_app";}
    static initialize() {
        this.handlePush = this.handlePush.bind(this);
        this.listeners = new Set();
        this.__ORIGINAL_PUSH__ = window[this.chunkName].push;
        Object.defineProperty(window[this.chunkName], "push", {
            configurable: true,
            get: () => this.handlePush,
            set: (newPush) => {
                this.__ORIGINAL_PUSH__ = newPush;
                Object.defineProperty(window[this.chunkName], "push", {
                    value: this.handlePush,
                    configurable: true,
                    writable: true
                });
            }
        });
    }    
    static addListener(listener: (exports: any) => void) {
        this.listeners.add(listener);
        return this.removeListener.bind(this, listener);
    }
    static removeListener(listener: (exports: any) => void) {return this.listeners.delete(listener);}
    static handlePush(chunk: [any, any]) {
        const [, modules] = chunk;
        for (const moduleId in modules) {
            const originalModule = modules[moduleId];
            modules[moduleId] = (module: any, exports: any, require: any) => {
                try {
                    Reflect.apply(originalModule, null, [module, exports, require]);
                    const listeners = [...this.listeners];
                    for (let i = 0; i < listeners.length; i++) {
                        try {listeners[i](exports);}
                        catch (error) {}
                    }
                }
                catch (error) {}
            };
            Object.assign(modules[moduleId], originalModule, {
                toString: () => originalModule.toString()
            });
        }
        return Reflect.apply(this.__ORIGINAL_PUSH__, window[this.chunkName], [chunk]);
    }
}

export default function define() {
    WebpackModules.initialize();
    return WebpackModules;
}