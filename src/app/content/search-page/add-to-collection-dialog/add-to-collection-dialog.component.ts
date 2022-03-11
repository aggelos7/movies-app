import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateCollectionData } from 'src/app/models/createCollectionData';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-add-to-collection-dialog',
  templateUrl: './add-to-collection-dialog.component.html',
  styleUrls: ['./add-to-collection-dialog.component.css']
})
export class AddToCollectionDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<CreateCollectionData>;
  displayedColumns: string[] = ['title', 'description', 'select_collection'];
  collections!: CreateCollectionData[];

  constructor(
    public dialogRef: MatDialogRef<AddToCollectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private localStorageService: LocalStorageService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.collections = JSON.parse(this.localStorageService.get('Collections'));
    this.dataSource.data = this.collections;
  }

  selectCollection(collection: CreateCollectionData){
    // collection.movies.push(this.data.movie);
    this.collections.find(item => item.title == collection.title)?.movies.push(this.data.movie);
    this.localStorageService.set('Collections', this.collections);
    this.dialogRef.close(true);
  }

}
