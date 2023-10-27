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
