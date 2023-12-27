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

  buttonAddOrEdit : string = "Ajouter";
  disableAddOrEditbutton : boolean = true;
  bgButton = 'bg-blue-800';
  valLength! : any;
  disableAddEditButton : boolean = true;
  listCat : ICategorie[] = [];
  catItem : ICategorie|undefined|null;
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
    this.inputOntyped();
    this.CategorieService.displayCategorie().subscribe(response =>{
      this.listCat = response.data;
    });
  }

  get categorie()
  {
      return this.formCat.get('categorie');
  }

  addNewCategorie()
  {
      let inputValue = this.categorie?.value
      if(typeof(inputValue) === 'string')
      {
          this.catItem = {libelle : inputValue}
          this.CategorieService.addCategorie(this.catItem).subscribe(response=>{
            console.log(response)
            this.formCat.reset();
          })
      }
  }

  search()
  {
    if(this.typedValue =="")
    {
        this.ngOnInit()
    }
    else
    {
      this.listCat = this.listCat.filter(res=>{
          return res.libelle.toLowerCase().match(this.typedValue.toLowerCase());
      })
    }
  }


  toggle(){
    this.isToggle = !this.isToggle;
    if(this.isToggle)
    {
        this.ngOnInit();
        this.bgButton = 'bg-yellow-300';
        

        this.buttonAddOrEdit = 'Modifier';
        this.disableWhenAdd = true;
        this.hideElement = true;
        this.editCatVar = true;
        console.log('Editer')
    }
    else
    {
      this.ngOnInit();
      this.bgButton = "bg-blue-800";
      this.buttonAddOrEdit = 'Ajouter';
      this.disableWhenAdd = false;
      this.hideElement = false;
      this.editCatVar = false;

      console.log('Ajouter');
    }
  }

  editCategorie(id : any, libelle : any)
  {
      if(this.editCatVar == true){
        this.categorie?.setValue(libelle);
        console.log(libelle);
      }
  }

  ok()
  {
    console.log('Je ne sais')
  }

  inputOntyped()
  {
    if(this.categorie?.value !== undefined && this.categorie?.value!.length >2)
    {
      this.disableAddEditButton = false;
    }
  }
  

  checkAllCheckBoxes()
  {
      for(let item of this.listCat){
          item.checked = this.checkAll
      }
      this.updateCheckAllState();
      this.getSelectedIds();
  }

  updateCheckAllState()
  {
      this.checkAll = this.listCat.every(item =>item.checked);
  }

  checkSingleCheckBox(){
    this.updateCheckAllState();
    this.getSelectedIds();
  }

  getSelectedIds()
  {
    this.selectedCatIds = this.listCat.filter(
      item =>item.checked).map(
        item=>item.id
    )
    console.log(this.selectedCatIds)
  }
}
