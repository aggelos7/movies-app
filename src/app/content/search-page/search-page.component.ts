import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Movie } from 'src/app/models/movie';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesAppService } from 'src/app/services/moviesApp.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { AddToCollectionDialogComponent } from './add-to-collection-dialog/add-to-collection-dialog.component';


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

  displayedColumns: string[] = ['poster_path', 'title', 'Vote_average', 'add_to_collection'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  length!: number;
  pageIndex!: number;
  pageSize!: number;
  pageResults: any;
  pageEvent!: PageEvent;

  constructor(
    private service: MoviesAppService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: SnackBarService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.pageIndex = 1;
    this.pageSize = 10;
    this.pageResults = JSON.parse(this.localStorageService.get('this.pageResults'));
    this.movies = this.pageResults ? this.pageResults.data : [];
    this.length = this.pageResults ? this.movies.length : 0;
    this.pageEvent = this.pageResults ? this.pageResults.pageEvent : null;

    if (this.pageResults) this.dataSource.data = this.filterSearchResults(this.movies, this.pageSize);

    if (this.pageEvent != null) this.handlePageEvent(this.pageEvent);
  }


  search(searchNgModel: NgModel) {
    if (!((searchNgModel.touched || searchNgModel.dirty) && searchNgModel.errors && searchNgModel.errors['searchTextInvalid'])) {
      this.service.getMovies(this.searchText).subscribe(
        (result: any) => {
          // console.log(result);
          this.movies = result.results;
          this.length = result.results.length;
          this.pageIndex = result.page;

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
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex + 1;
    this.dataSource.data = this.filterSearchResults(this.movies, this.pageSize);
  }

  public navigateMovieDetail(movieID: number) {
    this.localStorageService.set('this.pageResults',
      { 'data': this.movies, 'pageEvent': this.pageEvent });
    this.router.navigate([movieID]);
  }

  public addToCollection(movie: Movie) {
    const dialogRef = this.dialog.open(AddToCollectionDialogComponent, {
      height: '600px',
      width: '700px',
      data: {
        movie: movie
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open('Movie added to collection successfully');
      } else {
        this.snackbar.open('Ooops something went wrong! Please try again!');
      }
    });
  }

}
