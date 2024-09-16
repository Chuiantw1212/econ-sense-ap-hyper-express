/**
 * 雜物堆
 */

export interface IOptionsItem {
    label: string,
    value: string | number,
}

export interface ICounty {
    countycode: string,
    countyname: string,
    countycode01: number,
}

export interface ITown {
    towncode: string,
    townname: string,
    towncode01: number,
}

export interface ISelectMap {
    [key: string]: IOptionsItem[];
}

export interface ISelectDocData {
    key: string,
    options: IOptionsItem[]
}