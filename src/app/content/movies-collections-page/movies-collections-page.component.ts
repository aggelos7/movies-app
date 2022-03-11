import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CreateCollectionData } from 'src/app/models/createCollectionData';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-movies-collections-page',
  templateUrl: './movies-collections-page.component.html',
  styleUrls: ['./movies-collections-page.component.css']
})
export class MoviesCollectionsPageComponent implements OnInit {
  dataSource!: MatTableDataSource<CreateCollectionData>;
  displayedColumns: string[] = ['title', 'description'];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.data = JSON.parse(this.localStorageService.get('Collections'));
  }

  navigateToCreateCollections() {
    this.router.navigateByUrl('collections/create');
  }

}
