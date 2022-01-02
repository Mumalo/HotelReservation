export const bindData = (source: any, target: any): void => {
    for (let [key, val] of Object.entries(source)) {
        if (val !== undefined || val !== '') {
            target[key] = val;
        }
    }
}
