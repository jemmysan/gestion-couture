export interface IArticle {
    id?: number,
    libelle?: string,
    price?: number,
    stock?:number,
    categorie?: number,
    fournisseur?: number,
    photo?: string,
    reference?: string,
}

export interface ICategorie {
    ids?:number[];
    checked?: boolean;
    id?: number,
    libelle: string,
}

export interface Ifournisseur{
    id : number
    last_name?: string,
    first_name?:string,
    telephone?:string,
    addresse?:string
}


