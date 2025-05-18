export interface IBaseBook {
    name: string;
    description: string;
    author: string;
    written_date: Date;
}

export interface IBook extends IBaseBook{
    uuid: string;
}
