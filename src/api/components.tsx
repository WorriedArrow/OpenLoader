// @ts-nocheck
import { OpenLoader, WebpackModules } from "../main";
import { React, ReactDOM } from "../modules";

export default {
    generic: {
        text: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("description-foE_WP");
            base.textContent = options.text;
            return base;
        },
        /**
         * Huge props to the BetterDiscord project for some of this code.
         */
        switch: {
            create: function(container, checked = false, onChange = () => {}) {
                if(!Array.from(document.styleSheets).find(s => Array.from(s.cssRules).map(r => r.cssText).join("").includes(".ol-switch"))) OpenLoader.styleInjector.inject(`.ol-switch{position:relative;transition:.25s cubic-bezier(0,.3,.7,1) filter,.25s cubic-bezier(0,.3,.7,1) opacity}.ol-switch-body{--switch-color:#72767d;--symbol1path:path('M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z');--symbol2path:path('M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z');border-radius:14px;width:40px;height:24px;background-color:var(--switch-color);transition:.25s cubic-bezier(0,.3,.7,1) background-color;position:relative}.ol-switch input:active+.ol-switch-body{--switch-color:rgba(100,137,126)}.ol-switch input:checked+.ol-switch-body{--switch-color:#3ba55c;--symbol1path:path('M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z');--symbol2path:path('M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z')}.full-motion .ol-switch input:active+.ol-switch-body{--symbol1path:path('M6.56666 11.0013L6.56666 8.96683L13.5667 8.96683L13.5667 11.0013L6.56666 11.0013Z');--symbol2path:path('M13.5582 8.96683L13.5582 11.0013L6.56192 11.0013L6.56192 8.96683L13.5582 8.96683Z')}.ol-switch input:checked:active+.ol-switch-body{--switch-color:rgba(81,162,128)}.full-motion .ol-switch input:checked:active+.ol-switch-body{--symbol1path:path('M6.56666 11.0013L6.56666 8.96683L13.5667 8.96683L13.5667 11.0013L6.56666 11.0013Z');--symbol2path:path('M13.5582 8.96683L13.5582 11.0013L6.56192 11.0013L6.56192 8.96683L13.5582 8.96683Z')}.ol-switch .ol-switch-symbol path{fill:var(--switch-color);transition:.25s cubic-bezier(0,.3,.7,1)}.ol-switch .ol-switch-symbol path:first-child{d:var(--symbol1path)}.ol-switch .ol-switch-symbol path:last-child{d:var(--symbol2path)}.ol-switch input{position:absolute;z-index:1;opacity:0;margin:0;width:100%;height:100%;border-radius:100px;cursor:pointer}.ol-switch-body .ol-switch-slider{display:block;position:absolute;left:-3px;width:28px;height:18px;margin:3px;transition:.25s cubic-bezier(0,.3,.7,1)}.ol-switch input:active+.ol-switch-body .ol-switch-slider{left:1px}.ol-switch input:checked+.ol-switch-body .ol-switch-slider{left:12px}.ol-switch input:active:checked+.ol-switch-body .ol-switch-slider{left:8px}.ol-switch-body .ol-switch-slider .ol-switch-handle{transition:.25s cubic-bezier(0,.3,.7,1);position:relative}.ol-switch input:active+.ol-switch-body .ol-switch-handle{width:28px;height:18px;y:1;x:0}.ol-switch input:checked:active+.ol-switch-body .ol-switch-handle{x:0}.ol-switch-disabled{opacity:.5;filter:grayscale(1)}.ol-switch-disabled input{cursor:not-allowed}`)
                return ReactDOM.render(React.createElement(this.component, {
                    checked,
                    onChange
                }), container).onChange;
            },
            component: class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {checked: this.props.checked};
                    this.onChange = this.onChange.bind(this);
                }
    
                onChange() {
                    if (this.props.disabled) return;
                    this.onChangeRaw(this.props.onChange(!this.state.checked, this.onChangeRaw.bind(this)));
                }

                onChangeRaw(didChange) {
                    if (didChange ?? true) this.setState({checked: !this.state.checked});
                }
    
                render() {
                    const enabledClass = this.props.disabled ? " ol-switch-disabled" : "";
                    const checkedClass = this.state.checked ? " ol-switch-checked" : "";
                    
                    return <div className={`ol-switch` + enabledClass + checkedClass}>
                        <input id={this.props.id} type="checkbox" disabled={this.props.disabled} checked={this.state.checked} onChange={this.onChange} />
                        <div className="ol-switch-body">
                            <svg className="ol-switch-slider" viewBox="0 0 28 20" preserveAspectRatio="xMinYMid meet">
                            <rect className="ol-switch-handle" fill="white" x="4" y="0" height="20" width="20" rx="10"></rect>
                                <svg className="ol-switch-symbol" viewBox="0 0 20 20" fill="none">
                                    <path></path>
                                    <path></path>
                                </svg>
                            </svg>
                        </div>
                    </div>;
                }
            }
        },
        buttons: {
            blurple: (options: any) => {
                var base = document.createElement("button");
                base.classList.add("button-f2h6uQ", "lookFilled-yCfaCM", "colorBrand-I6CyqQ", "sizeSmall-wU2dO-", "grow-2sR_-F");
                base.onclick = options.onclick;
                var contents = document.createElement("div");
                contents.classList.add("contents-3ca1mk");
                contents.textContent = options.text;
                base.appendChild(contents);
                return base;
            },
            dangerOutlined: (options: any) => {
                var base = document.createElement("button");
                base.classList.add("button-f2h6uQ", "lookOutlined-3yKVGo", "colorRed-rQXKgM", "sizeSmall-wU2dO-", "grow-2sR_-F");
                base.onclick = options.onclick;
                var contents = document.createElement("div");
                contents.classList.add("contents-3ca1mk");
                contents.textContent = options.text;
                base.appendChild(contents);
                return base;
            },
            danger: (options: any) => {
                var base = document.createElement("button");
                base.classList.add("button-f2h6uQ", "lookFilled-yCfaCM", "colorRed-rQXKgM", "sizeSmall-wU2dO-", "grow-2sR_-F");
                base.onclick = options.onclick;
                var contents = document.createElement("div");
                contents.classList.add("contents-3ca1mk");
                contents.textContent = options.text;
                base.appendChild(contents);
                return base;
            },
            neutral: (options: any) => {
                var base = document.createElement("button");
                base.classList.add("button-f2h6uQ", "lookFilled-yCfaCM", "colorPrimary-2AuQVo", "sizeSmall-wU2dO-", "grow-2sR_-F");
                base.onclick = options.onclick;
                var contents = document.createElement("div");
                contents.classList.add("contents-3ca1mk");
                contents.textContent = options.text;
                base.appendChild(contents);
                return base;
            }
        },
        spinner: () => {
            var base = document.createElement("span");
            base.classList.add("spinner-2RT7ZC");
            base.role = "img";
            base.ariaLabel = "Loading";
            var inner = document.createElement("span");
            inner.classList.add("inner-26JK4f");
            var cube1 = document.createElement("span");
            cube1.classList.add("wanderingCubesItem-3Us-UG");
            var cube2 = document.createElement("span");
            cube2.classList.add("wanderingCubesItem-3Us-UG");
            inner.appendChild(cube1);
            inner.appendChild(cube2);
            base.appendChild(inner);
            return base;
        },
        modal: {
            open: (options: any): string => {
                const ModalActions = {
                    openModal: WebpackModules.getModule(m => typeof m === "function" && m?.toString().includes("onCloseCallback") && m?.toString().includes("Layer"), {searchExports: true}),
                    closeModal: WebpackModules.getModule(m => typeof m === "function" && m?.toString().includes("onCloseCallback()"), {searchExports: true}),
                }
                return ModalActions.openModal(props => {
                            return React.createElement(WebpackModules.getModule(m => m?.toString?.()?.includes(".confirmButtonColor"), {searchExports: true}), Object.assign({
                                header: options.title,
                                confirmButtonColor: options.buttons[0].color ?? options.buttons[1]?.color ?? WebpackModules.getModule(m => m.BorderColors, {searchExports: true}).Colors.BRAND,
                                confirmText: options.buttons[0].content ?? options.buttons[1]?.content,
                                cancelText: options.buttons[1]?.content ?? null,
                                onConfirm: options.buttons[0].onclick ?? options.buttons[1]?.onclick,
                                onCancel: options.buttons[1]?.onclick,
                                bodyClassName: "defaultColor-1EVLSt text-sm-normal-AEQz4v",
                                children: options.contents
                            }, props));
                }, { modalKey: options.modalKey });
            },
            close: (key: string | number) => {
                const ModalActions = {
                    openModal: WebpackModules.getModule(m => typeof m === "function" && m?.toString().includes("onCloseCallback") && m?.toString().includes("Layer"), {searchExports: true}),
                    closeModal: WebpackModules.getModule(m => typeof m === "function" && m?.toString().includes("onCloseCallback()"), {searchExports: true}),
                }
                ModalActions.closeModal(key.toString());
            }
        },
        tooltip: (options: { node: HTMLElement, text: string | HTMLElement, options: { style: "primary" | "info" | "success" | "warn" | "danger", side: "top" | "right" | "bottom" | "left", preventFlip: boolean, disabled: boolean } }) => {
            return new Tooltip(options.node, options.text, options.options);
        }
    },
    settingsMenu: {
        separator: () => {
            var base = document.createElement("div");
            base.classList.add("separator-2N511j");
            return base;
        },
        header: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("header-2F5_LB");
            var headerContent = document.createElement("div");
            headerContent.classList.add("eyebrow-1Shfyi");
            headerContent.textContent = options.text;
            base.appendChild(headerContent);
            return base;
        },
        item: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("item-2GWPIy", "themed-qqoYp3");
            base.textContent = options.text;
            base.onclick = options.onclick;
            return base;
        },
        settingsToggles: (options: { toggles: any, toggleFns: any, settingsStrings: any; }) => {
            var base = document.createElement("div");
            Object.values(options.toggles).forEach((category, idx) => {
                var categoryElement = document.createElement("div");
                var nameElement = document.createElement("h3");
                nameElement.classList.add("h5-2feg8J", "eyebrow-2wJAoF", "defaultMarginh5-3THN2O");
                if(Object.values(Object.values(options.settingsStrings))[idx].name === "Experimental Settings") {
                    nameElement.style.display = "flex";
                    nameElement.style.gap = "4px";
                    nameElement.appendChild(OpenLoader.componentBuilder.parseHTML(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16"><path fill="currentColor" d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"></path></svg>`))
                    nameElement.appendChild(document.createTextNode(Object.values(Object.values(options.settingsStrings))[idx].name));
                } else {
                    nameElement.textContent = Object.values(Object.values(options.settingsStrings))[idx].name;
                }
                Object.values(category.toggles).forEach((toggle, idx2, arr) => {
                    var main = document.createElement("div");
                    main.classList.add("container-31PmuA", idx == arr.length - 1 ? "marginBottom20-315RVT" : "marginBottom40-fvAlAV");
                    var labelRow = document.createElement("div");
                    labelRow.classList.add("labelRow-NnoUIp");
                    var label = document.createElement("label");
                    label.classList.add("title-2yADjX");
                    label.textContent = Object.values(Object.values(options.settingsStrings)[idx].toggles)[idx2].name;
                    var controlWrapper = document.createElement("div");
                    controlWrapper.classList.add("control-10qYax");
                    OpenLoader.components.generic.switch.create(controlWrapper, toggle, Object.values(Object.values(options.toggleFns)[idx].toggles)[idx2].toggleFn);
                    var note = document.createElement("div");
                    note.classList.add("note-3SS3a9");
                    var description = document.createElement("div");
                    description.classList.add("colorStandard-1Xxp1s", "size14-k_3Hy4", "description-foE_WP", "formText-2UzJT0", "modeDefault-3Warim");
                    description.textContent = Object.values(Object.values(options.settingsStrings)[idx].toggles)[idx2].description;
                    var divider = document.createElement("div");
                    divider.classList.add("divider-3nqZNm", "dividerDefault-wIfHHD");
                    labelRow.appendChild(label);
                    labelRow.appendChild(controlWrapper);
                    note.appendChild(description);
                    main.appendChild(labelRow);
                    main.appendChild(note);
                    main.appendChild(divider);
                    categoryElement.appendChild(main);
                })
                base.appendChild(nameElement);
                base.appendChild(categoryElement);
            })
            return base;
        }
    },
}

const toPx = function(value) {
    return `${value}px`;
};

const styles = ["primary", "info", "success", "warn", "danger"];
const sides = ["top", "right", "bottom", "left"];
 
class Tooltip {
    constructor(node: HTMLElement, text: string | HTMLElement, options: { style: "primary" | "info" | "success" | "warn" | "danger", side: "top" | "right" | "bottom" | "left", preventFlip: boolean, disabled: boolean }) {
        OpenLoader.styleInjector.inject(".ol-layer{position:absolute}.ol-tooltip{position:relative;border-radius:5px;font-weight:500;font-size:14px;line-height:16px;max-width:190px;box-sizing:border-box;word-wrap:break-word;z-index:1002;will-change:opacity,transform;box-shadow:var(--elevation-high);color:var(--header-primary)}.ol-tooltip-content{padding:8px 12px;overflow:hidden}.ol-tooltip-pointer{pointer-events:none;width:0;height:0;border:5px solid transparent}.ol-tooltip-primary{background-color:var(--background-floating);color:var(--text-normal)}.ol-tooltip-primary .ol-tooltip-pointer{border-top-color:var(--background-floating)}.ol-tooltip-info{background-color:#4a90e2}.ol-tooltip-info .ol-tooltip-pointer{border-top-color:#4a90e2}.ol-tooltip-success{background-color:#43b581}.ol-tooltip-success .ol-tooltip-pointer{border-top-color:#43b581}.ol-tooltip-danger{background-color:#f04747}.ol-tooltip-danger .ol-tooltip-pointer{border-top-color:#f04747}.ol-tooltip-warn{background-color:#ffa600}.ol-tooltip-warn .ol-tooltip-pointer{border-top-color:#ffa600}.ol-tooltip-top .ol-tooltip-pointer{position:absolute;top:100%;left:50%;margin-left:-5px}.ol-tooltip-bottom .ol-tooltip-pointer{position:absolute;bottom:100%;left:50%;margin-left:-5px;transform:rotate(180deg)}.ol-tooltip-right .ol-tooltip-pointer{position:absolute;right:100%;top:50%;margin-top:-5px;border-left-width:5px;transform:rotate(90deg)}.ol-tooltip-left .ol-tooltip-pointer{position:absolute;left:100%;top:50%;margin-top:-5px;border-left-width:5px;transform:rotate(270deg)}");
        if(!options) options = {};
        const { style = "primary", side = "top", preventFlip = false, disabled = false } = options;
        this.node = node;
        this.label = text;
        this.style = style.toLowerCase();
        this.side = side.toLowerCase();
        this.preventFlip = preventFlip;
        this.disabled = disabled;
        this.active = false;

        if (!sides.includes(this.side)) return OpenLoader.logger.log("Tooltip", `Side ${this.side} does not exist.`);
        if (!styles.includes(this.style)) return OpenLoader.logger.log("Tooltip", `Style ${this.style} does not exist.`);
 
        this.element = OpenLoader.componentBuilder.parseHTML(`<div class="ol-layer">`);
        this.tooltipElement = OpenLoader.componentBuilder.parseHTML(`<div class="ol-tooltip" style="transition: transform 0.09s ease-in, opacity 0.09s ease-in; transform: scale(0.93); opacity: 0"><div class="ol-tooltip-pointer"></div><div class="ol-tooltip-content"></div></div>`);
        this.tooltipElement.classList.add(`ol-tooltip-${this.style}`);

        this.labelElement = this.tooltipElement.childNodes[1];
        if (text instanceof HTMLElement) this.labelElement.append(text);
        else this.labelElement.textContent = text;

        this.element.append(this.tooltipElement); 
 
        this.node.addEventListener("mouseenter", () => {
            if (this.disabled) return;
            this.show();
        });
 
        this.node.addEventListener("mouseleave", () => {
            this.hide();
        });
    }
 
    /** Alias for the constructor */
    static create(node, text, options = {}) {return new Tooltip(node, text, options);}
 
    /** Container where the tooltip will be appended. */
    get container() {return document.querySelector(`#app-mount`);}
    /** Boolean representing if the tooltip will fit on screen above the element */
    get canShowAbove() {return this.node.getBoundingClientRect().top - this.element.offsetHeight >= 0;}
    /** Boolean representing if the tooltip will fit on screen below the element */
    get canShowBelow() {return this.node.getBoundingClientRect().top + this.node.offsetHeight + this.element.offsetHeight <= OpenLoader.window.screenHeight;}
    /** Boolean representing if the tooltip will fit on screen to the left of the element */
    get canShowLeft() {return this.node.getBoundingClientRect().left - this.element.offsetWidth >= 0;}
    /** Boolean representing if the tooltip will fit on screen to the right of the element */
    get canShowRight() {return this.node.getBoundingClientRect().left + this.node.offsetWidth + this.element.offsetWidth <= OpenLoader.window.screenWidth;}
 
    /** Hides the tooltip. Automatically called on mouseleave. */
    hide() {
        /** Don't rehide if already inactive */
        if (!this.active) return;
        this.active = false;
        (this.tooltipElement as HTMLElement).style.transform = "scale(0.93)";
        (this.tooltipElement as HTMLElement).style.opacity = "0";
        setTimeout(() => this.element.remove(), 90)
    }
 
    /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
    show() {
        /** Don't reshow if already active */
        if (this.active) return;
        this.active = true;
        this.labelElement.textContent = this.label;
        this.container.append(this.element);
 
        if (this.side == "top") {
            if (this.canShowAbove || (!this.canShowAbove && this.preventFlip)) this.showAbove();
            else this.showBelow();
        }
 
        if (this.side == "bottom") {
            if (this.canShowBelow || (!this.canShowBelow && this.preventFlip)) this.showBelow();
            else this.showAbove();
        }
 
        if (this.side == "left") {
            if (this.canShowLeft || (!this.canShowLeft && this.preventFlip)) this.showLeft();
            else this.showRight();
        }
 
        if (this.side == "right") {
            if (this.canShowRight || (!this.canShowRight && this.preventFlip)) this.showRight();
            else this.showLeft();
        }
        (this.tooltipElement as HTMLElement).style.transform = "scale(1)";
        (this.tooltipElement as HTMLElement).style.opacity = "1";

        /** Do not create a new observer each time if one already exists! */
        if (this.observer) return;
        /** Use an observer in show otherwise you'll cause unclosable tooltips */
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const nodes = Array.from(mutation.removedNodes);
                const directMatch = nodes.indexOf(this.node) > -1;
                const parentMatch = nodes.some(parent => parent.contains(this.node));
                if (directMatch || parentMatch) {
                    this.hide();
                    this.observer.disconnect();
                }
            });
        });
 
        this.observer.observe(document.body, {subtree: true, childList: true});
    }
 
    /** Force showing the tooltip above the node. */
    showAbove() {
        this.tooltipElement.classList.add("ol-tooltip-top");
        this.element.style.setProperty("top", toPx(this.node.getBoundingClientRect().top - this.element.offsetHeight - 10));
        this.centerHorizontally();
    }
 
    /** Force showing the tooltip below the node. */
    showBelow() {
        this.tooltipElement.classList.add("ol-tooltip-bottom");
        this.element.style.setProperty("top", toPx(this.node.getBoundingClientRect().top + this.node.offsetHeight + 10));
        this.centerHorizontally();
    }
 
    /** Force showing the tooltip to the left of the node. */
    showLeft() {
        this.tooltipElement.classList.add("ol-tooltip-left");
        this.element.style.setProperty("left", toPx(this.node.getBoundingClientRect().left - this.element.offsetWidth - 10));
        this.centerVertically();
    }
 
    /** Force showing the tooltip to the right of the node. */
    showRight() {
        this.tooltipElement.classList.add("ol-tooltip-right");
        this.element.style.setProperty("left", toPx(this.node.getBoundingClientRect().left + this.node.offsetWidth + 10));
        this.centerVertically();
    }
 
    centerHorizontally() {
        const nodecenter = this.node.getBoundingClientRect().left + (this.node.offsetWidth / 2);
        this.element.style.setProperty("left", toPx(nodecenter - (this.element.offsetWidth / 2)));
    }
 
    centerVertically() {
        const nodecenter = this.node.getBoundingClientRect().top + (this.node.offsetHeight / 2);
        this.element.style.setProperty("top", toPx(nodecenter - (this.element.offsetHeight / 2)));
    }
}