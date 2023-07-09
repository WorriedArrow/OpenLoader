import { Asset, AssetFetchOptions, AssetsOptions } from "../../types";

export default class Assets {
    options: AssetsOptions;
    constructor(options: AssetsOptions = { baseUrl: "obj.openloader.dev", protocol: "https" }) {
        this.options = options;
    }
    static constructUrl(protocol: string, baseUrl: string, path: string): string {
        return `${protocol}://${baseUrl}/${path}`;
    }
    async fetchAsset(options: AssetFetchOptions): Promise<Asset> {
        const url = Assets.constructUrl(this.options.protocol, this.options.baseUrl, options.url);
        const res = await fetch(url);
        const blob = await res.blob();
        const text = await blob.text();
        const originalName = options.url.split("/")[options.url.split("/").length - 1];
        let name: string | string[] = originalName.split(".");
        name.pop();
        name = name.join(".");
        if(blob.type.startsWith("text")) {
            return {
                data: text,
                type: blob.type,
                url: {
                    fullUrl: url,
                    path: options.url,
                },
                name,
                fullName: originalName
            }
        } else if(blob.type == "application/json") {
            return {
                data: JSON.parse(text),
                type: blob.type,
                url: {
                    fullUrl: url,
                    path: options.url,
                },
                name,
                fullName: originalName
            }
        } else {
            return {
                data: blob,
                type: blob.type,
                url: {
                    fullUrl: url,
                    path: options.url,
                },
                name,
                fullName: originalName
            }
        }
    }
}