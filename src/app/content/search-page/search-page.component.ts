import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Movie } from 'src/app/models/movie';
import { MoviesAppService } from 'src/app/services/moviesApp.service';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  @BlockUI('moviesContainer') moviesContainerBlock!: NgBlockUI;
  public searchText = '';
  public error = false;
  movies: Movie[] = [];
  dataSource: MatTableDataSource<Movie>;

  displayedColumns: string[] = ['poster_path', 'title', 'Vote_average'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  length!: number;
  pageIndex!: number;
  pageSize: number = 10;

  private resultsCount = 0;

  constructor(
    private service: MoviesAppService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
  }

  search(searchNgModel: NgModel) {
    if (!((searchNgModel.touched || searchNgModel.dirty) && searchNgModel.errors && searchNgModel.errors['searchTextInvalid'])) {
      this.service.getMovies(this.searchText).subscribe(
        (result: any) => {
          this.movies = result.results;
          this.length = result.results.length;
          this.pageIndex = result.page;
          this.resultsCount = result.results.length;

          // i am filtering the data manually as the 'results' array from the API response does not match with 
          // the 'total_pages' and 'total_results'. It seems that maximizes at 20 results
          this.dataSource.data = this.filterSearchResults(this.movies, this.pageSize);
        }
      );
    }
  }

  filterSearchResults(arr: Array<Movie>, chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    // page 1 takes res[0], page 2 takes res[1] etc...
    return res[this.pageIndex - 1];
  }

  public handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.resultsCount = e.length;
    this.dataSource.data = this.filterSearchResults(this.movies, this.pageSize);
  }

  public navigateMovieDetail(movieID: number) {
    this.router.navigate(['/movies/' + movieID]);
  }

}
