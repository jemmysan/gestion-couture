const uriPrefix : string[] = [
    '/categorie',
    '/article'
]

export const uri = {
    'prefixRef':'ref',
    'uriNumOrder': '/numOrder',
    'uriFour':'/fournisseur/find'
}

export const uriCategorie = {
    'addCategorie' :`${uriPrefix[0]}/store` ,
    'ListCategorie' :`${uriPrefix[0]}/list`,
    'updateCategorie' : `${uriPrefix[0]}/update/`,
    'deleteCategorie' : `${uriPrefix[0]}/delete`
}

export const uriArticleConf = {
    'listArtConf' : `${uriPrefix[1]}/list`
}

