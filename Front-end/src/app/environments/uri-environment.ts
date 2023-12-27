const uriPrefix : string[] = [
    '/categorie'
]

export const uri = {
    'prefixRef':'ref',
    'uriNumOrder': '/numOrder',
    'uriFour':'/fournisseur/find'
}

export const uriCategorie = {
    'addCategorie' :`${uriPrefix[0]}/store` ,
    'getCategorie' : `${uriPrefix[0]}/all`,
    'ListCategorie' :`${uriPrefix[0]}/list`,
    'updateCategorie' : `${uriPrefix[0]}/update/`,
    'deleteCategorie' : `${uriPrefix[0]}/delete`

}

