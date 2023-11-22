import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleConfectionComponent } from './articles/article-confection/article-confection.component';
import { ArticleVenteComponent } from './articles/article-vente/article-vente.component';
import { FormComponent } from './articles/article-confection/form/form.component';
import { ListComponent } from './articles/article-confection/list/list.component';
import { ItemComponent } from './articles/article-confection/list/item/item.component';
import { PaginationComponent } from './articles/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleConfectionComponent,
    ArticleVenteComponent,
    FormComponent,
    ListComponent,
    ItemComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
