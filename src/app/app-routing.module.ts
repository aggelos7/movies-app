import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesCollectionsPageComponent } from './content/movies-collections-page/movies-collections-page.component';
import { SearchPageComponent } from './content/search-page/search-page.component';
import { ModalContainerComponent } from './content/modal-container.component';
import { CreateCollectionPageComponent } from './content/create-collection-page/create-collection-page.component';

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'collections', component: MoviesCollectionsPageComponent},
  {path: 'collections/create', component: CreateCollectionPageComponent},
  {path: ':id', component: ModalContainerComponent},
  {path: '**', component: SearchPageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
