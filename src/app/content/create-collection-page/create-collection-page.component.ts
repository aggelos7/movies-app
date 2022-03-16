import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateCollectionData } from 'src/app/models/createCollectionData';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-create-collection-page',
  templateUrl: './create-collection-page.component.html',
  styleUrls: ['./create-collection-page.component.css']
})
export class CreateCollectionPageComponent implements OnInit {
  public form!: FormGroup;
  public collectionData!: CreateCollectionData;
  public collections: CreateCollectionData[];

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) { 
    this.collections = this.localStorageService.get('Collections') ? JSON.parse(this.localStorageService.get('Collections')) : [];
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      movies: []
    });

    this.form.valueChanges.subscribe((value: CreateCollectionData) => {
      this.collectionData = value;
    });
  }

  submitNewCollection(){
    this.collectionData.movies = [];
    this.collections.push(this.collectionData)
    this.localStorageService.set('Collections', this.collections);
  }

}
