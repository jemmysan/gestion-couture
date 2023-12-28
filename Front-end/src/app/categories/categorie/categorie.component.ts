import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categories/categorie.service';
import { ICategorie } from 'src/app/interfaces/idata';
import { FormControl, FormControlName, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})

export class CategorieComponent implements OnInit {

  action : string[] = ["Ajouter","Editer"]
  buttonAddOrEdit : string = this.action[0];
  disableAddOrEditbutton : boolean = true;
  bgButton = 'bg-blue-800';
  disableAddEditButton : boolean = true;
  disableDeleteButton : boolean = true;
  valLength! : any;
  listCat : ICategorie[] = [];
  catItem : any;
  typedValue! : string;
  numPage = 1;
  nbrPage = 3;
  isToggle! : boolean;
  disableWhenAdd! : boolean ;
  hideElement! : boolean;
  editCatVar! : boolean;
  checkAll : boolean = false;
  selectedCatIds : any[] = [];

  formCat = new FormGroup({
    categorie : new FormControl('',Validators.minLength(2))
  })

  constructor(private CategorieService  : CategorieService){}
  ngOnInit(): void {
    this.CategorieService.displayCategorie().subscribe(response =>{
      this.listCat = response.data;
    });
  }

  

  //**** Getter du input libelle ****/
  get categorie(){
      return this.formCat.get('categorie');
  }


  //******** Desactiver Le input libelle *****/
  disableLibelleInput()
  {
    if(this.selectedCatIds.length <=0){
      this.categorie?.disable()
    }else{
      this.categorie?.enable();
    }
  }
  //**** Ajouter une nouvelle categorie ******/
  addOrEditCategorie(){
    if(this.buttonAddOrEdit == this.action[0]){
        let inputValue = this.categorie?.value
        if(typeof(inputValue) === 'string'){
            this.catItem = {libelle : inputValue}
            this.CategorieService.addCategorie(this.catItem).subscribe(response=>{
              console.log(response)
              this.formCat.reset();
              this.ngOnInit();
            })
        }
      }else{
        // this.CategorieService.updateCategorie()
      }
  }

  /******* Afficher categorie par recherche Lettre  ********/
  search(){
    if(this.typedValue ==""){
        this.ngOnInit()
    }
    else{
      this.listCat = this.listCat.filter(res=>{
          return res.libelle.toLowerCase().match(this.typedValue.toLowerCase());
      })
    }
  }

//***** Changer etat en edit ou ajouter */
  toggle(){
    this.isToggle = !this.isToggle;
    if(this.isToggle){
        this.checkAll = false;
        this.ngOnInit();
        this.bgButton = 'bg-yellow-300';
        this.buttonAddOrEdit = 'Modifier';
        this.disableWhenAdd = true;
        this.hideElement = true;
        this.editCatVar = true;
        console.log('Editer')
    }else{
      this.ngOnInit();
      this.bgButton = "bg-blue-800";
      this.buttonAddOrEdit = 'Ajouter';
      this.disableWhenAdd = false;
      this.hideElement = false;
      this.editCatVar = false;

      console.log('Ajouter');
    }
  }

  //******* Modifier une categorie *******/
  editCategorie(id : any, libelle : any){
      if(this.editCatVar == true){
        this.categorie?.setValue(libelle);
        console.log(libelle);
      }
  }



  //********* Cocher toutes les categorie ********/
  checkAllCheckBoxes()
  {
      this.disableLibelleInput();
      for(let item of this.listCat){
          item.checked = this.checkAll
      }
      this.updateCheckAllState();
      this.getSelectedIds();
      this.getDeleteButtonDisabled();
  }

  //****** Mettre a jour les checkboxes ****/
  updateCheckAllState(){
      this.checkAll = this.listCat.every(item =>item.checked);
  }

  //******* Cocher une seule checkBox ******/
  checkSingleCheckBox(){
    this.disableLibelleInput();
    this.updateCheckAllState();
    this.getSelectedIds();
    this.getDeleteButtonDisabled();
  }

  //******* Recuperer l'id d'une categorie cliquer ******/
  getSelectedIds(){
    this.selectedCatIds = this.listCat.filter(
      item =>item.checked).map(
        item=>item.id
    )
    console.log(this.selectedCatIds)
  }

  //********* Desactiver ou activer le bouton ajout/modifier ****/
  onTypeEnableButton(){
    this.disableButton();
  }

  //******** Test taille value input pour desactiver *****/
  disableButton(){
    let lengthValue = this.categorie?.value?.length;
    if(lengthValue! >=3){
      this.disableAddOrEditbutton = false;
    }else{
      this.disableAddOrEditbutton = true;
    }
  }

  getDeleteButtonDisabled()
  {
    let val = this.selectedCatIds.length
    if(val>0){
      this.disableDeleteButton = false
    }else{
      this.disableDeleteButton = true
    }
  }


  /********* Delete Categorie  ********/
  deleteCategorie()
  { 
    let tabIds = {ids : this.selectedCatIds}
    return this.CategorieService.deleteCategorie(tabIds)
          .subscribe(response=>{
            console.log(response);
            this.ngOnInit();
          })  
  }
}
