import { OpenLoader } from "../main";

export default {
    generic: {
        text: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("description-30xx7u");
            base.textContent = options.text;
            return base;
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
            open: (options: any) => {
                var backdrop = document.createElement("div");
                backdrop.classList.add("backdrop-2ByYRN", "withLayer-2VVmpp", "ol-modal-backdrop");
                backdrop.style.transition = "opacity 135ms ease-in-out"
                backdrop.style.opacity = '0';
                backdrop.style.background = 'var(--black-500)';
                var layer = document.createElement("div");
                layer.classList.add("layer-1Ixpg3", "ol-modal");
                layer.innerHTML = `
                <div class="focusLock-2tveLW" role="dialog" aria-label="${options.title}" tabindex="-1" aria-modal="true">
                    <div class="root-g14mjS small-23Atuv fullscreenOnMobile-ixj0e3" style="opacity: 0; transform: scale(0); transition: transform 135ms ease-in-out, opacity 135ms ease-in-out">
                        <div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyStart-2Mwniq alignCenter-14kD11 noWrap-hBpHBz header-1zd7se" id="uid_841" style="flex: 0 0 auto">
                            <h1 class="defaultColor-1EVLSt heading-lg-semibold-2Z_RS3 defaultColor-1GKx81" data-text-variant="heading-lg/medium">
                                ${options.title}
                            </h1>
                        </div>
                        <div class="content-2hZxGK thin-31rlnD scrollerBase-_bVAAt" dir="ltr" style="overflow: hidden scroll; padding-right: 8px">
                            <div class="defaultColor-1EVLSt text-md-normal-304U3g" data-text-variant="text-md/normal">
                                ${options.contents}
                            </div>
                                <div aria-hidden="true" style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 0px;"></div>
                            </div>
                            <div class="flex-2S1XBF flex-3BkGQD horizontalReverse-60Katr horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-31IekZ footerSeparator-VzAYwb" style="flex: 0 0 auto">
                                <div class="flex-2S1XBF flex-3BkGQD horizontal-112GEH horizontal-1Piu5- flex-3BkGQD directionRow-2Iu2A9 justifyEnd-2G0m6w alignStretch-Uwowzr noWrap-hBpHBz" style="flex: 1 1 auto">
                                ${options.cancelButton ? `
                                    <button type="button" class="cancelButton-30e0cf button-f2h6uQ lookFilled-yCfaCM colorPrimary-2AuQVo sizeMedium-2bFIHr grow-2sR_-F ol-button-0">
                                        <div class="contents-3ca1mk">
                                            ${options.buttons[0].content}
                                        </div>
                                    </button>
                                    <button type="button" class="button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeMedium-2bFIHr grow-2sR_-F ol-button-1">
                                        <div class="contents-3ca1mk">
                                            ${options.buttons[1].content}
                                        </div>
                                    </button>
                                    ` : `
                                    <button type="button" class="button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeMedium-2bFIHr grow-2sR_-F ol-button-0">
                                        <div class="contents-3ca1mk">
                                            ${options.buttons[0].content}
                                        </div>
                                    </button>
                            `}
                            </div>
                        </div>
                    </div>
                </div>
                `;
                [...document.querySelectorAll('.layerContainer-2v_Sit')].reverse()[1].appendChild(backdrop);
                [...document.querySelectorAll('.layerContainer-2v_Sit')].reverse()[1].appendChild(layer);
                (document.querySelector('.ol-button-0') as HTMLElement).onclick = ev => {
                    OpenLoader.components.generic.modal.close();
                    options.buttons[0].onclick?.call(undefined, ev);
                }
                if(document.querySelector('.ol-button-1')) {
                    (document.querySelector('.ol-button-1') as HTMLElement).onclick = ev => {
                        OpenLoader.components.generic.modal.close();
                        options.buttons[1]?.onclick?.call(undefined, ev);
                    }
                }
                setTimeout(() => {
                    backdrop.style.opacity = "0.85";
                    (layer.querySelector('.root-g14mjS') as HTMLElement).style.opacity = "1";
                    (layer.querySelector('.root-g14mjS') as HTMLElement).style.transform = "scale(1)";
                }, 0);
            },
            close: () => {
                var modalRoot = document.querySelector('.ol-modal .root-g14mjS') as HTMLElement;
                var backdrop = document.querySelector('.ol-modal-backdrop') as HTMLElement;
                backdrop.style.opacity = "0.57";
                modalRoot.style.opacity = "0.07";
                modalRoot.style.transform = "scale(0.8)";
                setTimeout(() => {
                    document.querySelector(".ol-modal")?.remove();
                    document.querySelector(".ol-modal-backdrop")?.remove();
                }, 135);
            }
        },
        tooltip: (options: { element: HTMLElement, text: string }) => {
            options.element.addEventListener("mouseenter", () => {
                var tooltip = OpenLoader.componentBuilder.parseHTML(`<div class="theme-dark layer-2aCOJ3 disabledPointerEvents-2AmYRc ol-tooltip" style="position: absolute; transition: transform 85ms ease-in-out, opacity 85ms ease-in-out; opacity: 0; transform: scale(0.93);">
                    <div class="tooltip-14MtrL tooltipTop-1wv5UJ tooltipPrimary-3qLMbS tooltipDisablePointerEvents-1huO19" style="opacity: 1; transform: none;">
                        <div class="tooltipPointer-3L49xb" style="left: calc(50% + 0px);"></div>
                        <div class="tooltipContent-Nejnvh">${options.text}</div>
                    </div>
                </div>`) as HTMLElement;

                document.querySelector(".notDevTools-1zkgfK > .layerContainer-2v_Sit")?.appendChild(tooltip);

                tooltip.style.top = (options.element.getBoundingClientRect().top - options.element.getBoundingClientRect().height - 12) + "px";
                tooltip.style.left = (options.element.getBoundingClientRect().left - tooltip.getBoundingClientRect().width / 2 + OpenLoader.client.zoom / 10) + "px";
                
                setTimeout(() => {
                    tooltip.style.opacity = '1';
                    tooltip.style.transform = 'scale(1)';
                })
            })

            options.element.addEventListener("mouseleave", () => {
                var tooltip = document.querySelector(".ol-tooltip") as HTMLElement;
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0.93)';
                setTimeout(() => tooltip.remove(), 85);
            })

            options.element.addEventListener("DOMNodeRemoved", () => {
                var tooltip = document.querySelector(".ol-tooltip") as HTMLElement;
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'scale(0.93)';
                setTimeout(() => tooltip.remove(), 85);
            });

            (options.element.parentNode as HTMLElement).onclick = () => {

            }
        }
    },
    settingsMenu: {
        separator: () => {
            var base = document.createElement("div");
            base.classList.add("separator-2wx7h6");
            return base;
        },
        header: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("header-2Kx1US");
            var headerContent = document.createElement("div");
            headerContent.classList.add("eyebrow-1Shfyi");
            headerContent.textContent = options.text;
            base.appendChild(headerContent);
            return base;
        },
        item: (options: any) => {
            var base = document.createElement("div");
            base.classList.add("item-3XjbnG", "themed-2-lozF");
            base.textContent = options.text;
            base.onclick = options.onclick;
            return base;
        }
    }
}