// export const objectToArray = (myObj: object): any[] => {
//     const array: any[] = [];

//     Object.keys(myObj).forEach((key) => {
//         /* tslint:disable-next-line */
//         array.push({ [key]: myObj[key] }); // eslint-disable-line array-callback-return
//     });
//     return array;
// };

export const log = (message: string, color?: string) => {
    console.log(
        `%c ${message}`,
        `background: #222; color: ${color || '#bada55'}`
    );
};

export const urlParamsToArray = (url: string): any[] => {
    const params = url?.split('?')[1];

    return params?.split('&').map((param) => {
        const [key, value] = param.split('=');
        return { [key]: value };
    });
};
