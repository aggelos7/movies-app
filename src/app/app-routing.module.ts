import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './content/movie-details-page/movie-details-page.component';
import { MoviesCollectionsPageComponent } from './content/movies-collections-page/movies-collections-page.component';
import { SearchPageComponent } from './content/search-page/search-page.component';

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'collections', component: MoviesCollectionsPageComponent},
  {path: 'movies/:id', component: MovieDetailsPageComponent},
  {path: '**', component: SearchPageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
