const test = document.querySelector('fournisseur');

findFournisseur()
{
    test.addEventListener('input',()=>{
        console.log(test.value);
    })
}
