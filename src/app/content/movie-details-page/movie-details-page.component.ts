import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MovieWithDetails } from 'src/app/models/movieWithDetails';
import { SessionData } from 'src/app/models/session-data';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MoviesAppService } from 'src/app/services/moviesApp.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {
  public movieDetails!: MovieWithDetails;
  rateInput = new FormControl();
  sessionData!: SessionData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieDetailsPageComponent>,
    private moviesService: MoviesAppService,
    private localStorageService: LocalStorageService,
    private snackbar: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.fetchDetails(this.data.movieID);
  }

  fetchDetails(movieID: number) {
    this.moviesService.fetchDetails(movieID).subscribe(
      (result: any) => {
        this.movieDetails = result;
      }
    );
  }

  getGuestSession() {
    return new Promise<void>((resolve, reject) => {
      this.moviesService.getGuestSession().subscribe(
        (result: SessionData) => {
          this.localStorageService.set('sessionData', result);
          this.sessionData = result;
        },
        error => {
          console.log('Error in fetching session data')
        }
      );
      resolve();
    });
  }

  postRate(movieID: number) {
    this.moviesService.postRate(movieID, this.rateInput.value, this.sessionData.guest_session_id).subscribe(
      (result: any) => {
        this.snackbar.open('Rate submitted successfully');
        this.dialogRef.close();
      },
      error => {
        this.snackbar.open('Oops. Something went wrong! Please try again.');
        console.log('Error in submit of rate')
      }
    );
  }

  rateMovie() {
    this.sessionData = JSON.parse(this.localStorageService.get('sessionData'));
    if (this.sessionData) {
      this.postRate(this.data.movieID);
    } else {
      this.getGuestSession().then(
        () => {
          this.postRate(this.data.movieID);
        }
      );
    }

  }

}
