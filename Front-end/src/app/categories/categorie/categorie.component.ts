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

  listCat : ICategorie[] = [];
  catItem : ICategorie|undefined|null;

  formCat = new FormGroup({
    categorie : new FormControl('',Validators.minLength(2))
  })

  constructor(private CategorieService  : CategorieService){}
  ngOnInit(): void {
      this.CategorieService.displayCategorie(3).subscribe(response =>{
        this.listCat = response.data;
      })
  }

  get categorie()
  {
      return this.formCat.get('categorie');
  }

  addNewCategorie()
  {
    // console.log('ok');
    
      let inputValue = this.categorie?.value
      if(typeof(inputValue) === 'string')
      {
          this.catItem = {libelle : inputValue}
          this.CategorieService.addCategorie(this.catItem).subscribe(response=>{
            console.log(response)
          })
      }
   
  }
}
