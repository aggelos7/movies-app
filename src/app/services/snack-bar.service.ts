import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  config: MatSnackBarConfig;

  constructor(public snackBar: MatSnackBar) {
    this.config = new MatSnackBarConfig();
    this.config.verticalPosition = 'top';
    this.config.horizontalPosition = 'center';
    this.config.duration = 2000;
    // this.config.panelClass = 'error';
  }

  getDefaultConfiguration() {
    return this.config;
  }

  open(message: string, config: MatSnackBarConfig = this.config, action: string = 'OK') {
    this.snackBar.open(message, action, config);
  }
}
