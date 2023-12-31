import { Component, OnInit } from '@angular/core';

import { ICategorie, IArticle, Ifournisseur } from 'src/app/interfaces/idata';
import { ArticleConfService } from 'src/app/services/articles/article-conf.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ImageService } from 'src/app/services/images/image.service';
import { CommonService } from 'src/app/services/commonService/common.service';
import { FounisseurService} from 'src/app/services/fournisseurs/founisseur.service'
import { CategorieService } from 'src/app/services/categories/categorie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {

  categories:ICategorie[] = [];
  selectedFile : any;
  previewImageUrl: any;
  img: string = "assets/images/addmg.jpg";
  name:string='';
  refArray = [];
  lengthValue! :any;
  idCatNumOrder : number = 0;
  keyFournisseur! : {keyword : any};
  listFournisseur : boolean = true;
  tabFournisseur : Ifournisseur[] = [];
  fournisseurChoisenIds : Ifournisseur[] = []; 
  articleConfs : IArticle[] = [];
 

  articleForm = new FormGroup({
    libelle : new FormControl(''),
    price : new FormControl(''),
    stock : new FormControl(''),
    categorie_id : new FormControl(''),
    fournisseur_id : new FormControl(''),
    photo : new FormControl(''),
    reference : new FormControl ('')
  })
  constructor(private categorieService :CategorieService,
              private imageService : ImageService,
              private commonService : CommonService,
              private fournisseurService :  FounisseurService,
              private articleConfService : ArticleConfService
            ){}

  ngOnInit ()
  {
      this.categorieService.displayCategorie().subscribe((response=>{
         this.categories = response.data
      }))
  }

  get libelle()
  {
    return this.articleForm.get('libelle');
  }

  get price()
  {
    return this.articleForm.get('price');
  }

  get stock()
  {
    return this.articleForm.get('stock');
  }

  get fournisseur()
  {
    return this.articleForm.get('fournisseur_id');
  }

  get categorie()
  {
    return this.articleForm.get('categorie_id');
  }
 
  get reference()
  {
    return this.articleForm.get('reference');
  }

  handleFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const selectedImage = inputElement.files?.[0] as File;
    this.name = selectedImage.name
    
    if (selectedImage) {
      this.imageService.recupImg(selectedImage).subscribe({
        next: (arg) => {
          this.img = arg as string;
          this.articleForm.patchValue({
            photo: this.img 
          });
        }
      });
    }
  }
 
  generateNumOrder(model: string, idCat? : any)
  {
    this.commonService.getNumOrder(model,idCat).subscribe((response=>{
       this.idCatNumOrder = this.commonService.getAskedValue(response.numOrder);
       
      }));
    return this.idCatNumOrder
  }

  generateReference(catSelect? : HTMLSelectElement, idCat? : any)
  {
    this.reference?.setValue('');
    this.lengthValue = this.libelle?.value?.length
    if(this.lengthValue >=3)
    {
      let lib = this.libelle?.value;
      let selectedOption = catSelect?.options[catSelect.selectedIndex];
      let cat = selectedOption?.text;
      let code = this.generateNumOrder('Article',this.categorie?.value);
      let setref = this.commonService.createReference(lib,cat,code)
      this.reference?.setValue(setref)
    }
    else
    {
      this.reference?.setValue('');
      this.categorie?.setValue(null);
    }
    
  }

  
  addArticle()
  {
      console.log(this.articleForm.value)
  }


  findFournisseur()
  {
    let value: string | null | undefined
    value = this.fournisseur?.value  
      if(value!.length >=1){
      this.fournisseurService.findFournisseur({keyword : value}).subscribe(response=>{
          this.tabFournisseur = response;
          this.tabFournisseur =  this.removeIdOfArrayToAnother(this.fournisseurChoisenIds,this.tabFournisseur)
      })
      this.listFournisseur = false;
    }
    else{
      this.listFournisseur = true;
    }
  }

  selectFournisseur(idfour : number,prenomFour : string,nomFour : string)
  {
      this.fournisseurChoisenIds.push(
        {
          id : idfour,
          first_name : prenomFour,
          last_name : nomFour
        }
      )
      this.fournisseur?.reset();
      this.tabFournisseur = [];
  }

  removeFournisseur(id:any)
  {
    this.removeIdFromArray(id,this.fournisseurChoisenIds)
  }

  removeIdFromArray(id : any, arrayTarget : any)
  {
    let index = arrayTarget.indexOf(id);
    return arrayTarget.splice(index,1);
  }

  removeIdOfArrayToAnother(ArraySource: Ifournisseur[], ArrayTarget:Ifournisseur[]){
      let ids = ArraySource.map(item => item.id);
      return ArrayTarget.filter(element=> !ids.includes(element.id));
  }

  
  listArticleConf()
  {
      this.articleConfService.getArticleConf().subscribe(response=>{
          this.articleConfs = response.data
          console.log(this.articleConfs)
      })
  }

}
