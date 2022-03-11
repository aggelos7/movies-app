import { Component, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MovieDetailsPageComponent } from './movie-details-page/movie-details-page.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-modal-container',
    template: ''
})
export class ModalContainerComponent implements OnDestroy {
    destroy = new Subject<any>();
    // currentDialog!: MatDialog;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private currentDialog: MatDialog
    ) {
      this.route.params.pipe(takeUntil(this.destroy)).subscribe((params: any) => {

          const dialogRef = this.currentDialog.open(MovieDetailsPageComponent, {
            height: '600px',
            width: '700px',
            data: {
                movieID: params.id
            }
          });

        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('/');
        });
      });
    }
  
    ngOnDestroy() {
      this.destroy.next(true);
    }
}