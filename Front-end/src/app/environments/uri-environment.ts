const uriPrefix : string[] = [
    '/categorie'
]

export const uri = {
    'prefixRef':'ref',
    'uriNumOrder': '/numOrder',
    'uriFour':'/fournisseur/find'
}

export const uriCat = {
    'addCategorie' :`${uriPrefix[0]}/store` ,
    'getCategorie' : `${uriPrefix[0]}/all`,
    'ListCategorie' :`${uriPrefix[0]}/list/`,
}

