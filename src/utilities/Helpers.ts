import moment from 'moment';
import queryString from 'query-string';

export function formatDateTime(date: Date | undefined): string {
    return date === null || date === undefined ? "" : moment(date).format("DD/MM/YYYY HH:mm");
}

export function formatDate(date: Date | undefined): string {
    return date === null || date === undefined ? "" : moment(date).format("DD/MM/YYYY");
}
export function formatDateToString(date: Date | undefined): string {
    return date === null || date === undefined ? "" : moment(date).format("DD-MM-YYYY");
}

export function formatCurrency(number: number) {
    return `${number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}đ`;
}

export function formatNumber(number: number) {
    return number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function formatMoney(money: number) {
    var value = (money).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return value.substr(0, value.length - 2) + "đ";
}

export function generateRandomId(length: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function blobToFile(theBlob: Blob, fileName: string) {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}

export function formatPrice(price: number) {
    if (price === null || price === 0) {
        return '';
    } else {
        return parseInt(price.toString().replace(/\,/g, '').replace(/\./g, '')).toLocaleString('en-US');
    }
}

// parse object to query string
export function parseObjectToQueryString(filter: any) {
    let handledObject: any = {};
    Object.keys(filter).forEach((key: any) => {
        if (filter[key]) {
            if (Array.isArray(filter[key]) && filter[key][0]) {
                if (filter[key][0].length > 0) { // @Todo: có vấn đề chỗ này
                    handledObject = {
                        ...handledObject,
                        [key]: filter[key].join(",")
                    }
                }
            } else {
                handledObject = {
                    ...handledObject,
                    [key]: filter[key]
                }
            }
        }
    })

    const requestParams = queryString.stringify(handledObject);
    return decodeURIComponent(requestParams);
}

// parse object to query string
export function parseObjectToQs(filter: any) {
    let handledObject: any = {};
    Object.keys(filter).forEach((key: any) => {
        if (filter[key]) {
            if (Array.isArray(filter[key]) && filter[key].length > 0) {
                handledObject = {
                    ...handledObject,
                    [key]: filter[key].join(",")
                }
            } else {
                handledObject = {
                    ...handledObject,
                    [key]: filter[key]
                }
            }
        }
    })

    const requestParams = queryString.stringify(handledObject);
    return decodeURIComponent(requestParams);
}

export function parseQueryStringToObject(query: any) {
    let parsed = queryString.parse(query);
    return parsed;
}

export function parseQueryStringToObjectV2(query: any) {
    if (query === '') {
        return null;
    }
    let parsed = queryString.parse(query);
    return parsed;
}

export function mapObject<T>(source: any, targetType: new () => T) {
    const mappedObj = new targetType();

    if (!source) {
        return mappedObj;
    }

    return Object.keys(mappedObj).reduce((acc: any, key: string) => {
        acc[key] = source[key];
        return acc;
    }, {}) as T
}

export function roundTo(value: number, digits: number) {
    if (!digits) {
        digits = 0;
    }

    const multiplicator = Math.pow(10, digits);
    let result = parseFloat((value * multiplicator).toFixed(2));
    return parseFloat((Math.round(result) / multiplicator).toFixed(digits));
}

export function smParseJson(data: string) {
    let result: string | any = null;
    try {
        result = JSON.parse(data);
    } catch (e) {
        result = null;
    }
    return result;
}

export function calculatePostCommissionPrice(price: number, commissionRate:number) {
    const unroundedPrice = price * (100 - commissionRate) / 100;
    return unroundedPrice - Math.floor(unroundedPrice) >= 0.6 ? Math.ceil(unroundedPrice) : Math.floor(unroundedPrice);
}
