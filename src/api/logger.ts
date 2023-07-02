export default class Logger {
    logSpecial(origin: string, ...message: any[]) {
        console.log("%cOpenLoader%c%s%c", "background-color: #0073b0; padding: 2px 4px; border-radius: 4px; margin-right: 6px", "background-color: #700070; padding: 2px 4px; border-radius: 4px", origin, "", ...message);
    }

    log(origin: string, ...message: any[]) {
        console.log("%cOpenLoader%c%s%c", "background-color: #0073b0; padding: 2px 4px; border-radius: 4px; margin-right: 6px", "background-color: #005390; padding: 2px 4px; border-radius: 4px", origin, "", ...message);
    }
}