import { Injectable } from '@angular/core';
import { apiUrlEnv } from 'src/app/environments/apiurl-environment';
import { uri, uriCategorie } from 'src/app/environments/uri-environment';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
// import { IArticle } from 'src/app/interfaces/idata';

@Injectable({
  providedIn: 'root'
})
export class ArticleConfService {

  apiUrl  = apiUrlEnv.apiUrl;
  uriCategorie = uriCategorie.getCategorie;

  constructor(private http : HttpClient) { }


  getCategorie() : Observable<any>{
    return this.http.get(this.apiUrl+this.uriCategorie);
  }
}
