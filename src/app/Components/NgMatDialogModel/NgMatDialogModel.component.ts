import { Component, OnInit } from '@angular/core';
import {
  // MatDialog,
  // MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from 'src/app/Services/Products.service';

@Component({
  selector: 'app-NgMatDialogModel',
  templateUrl: './NgMatDialogModel.component.html',
  styleUrls: ['./NgMatDialogModel.component.css'],
  // standalone: true,
  // imports: [MatDialogModule, MatButtonModule],
})
export class NgMatDialogModelComponent implements OnInit {
  constructor(
    // public dialogRef: MatDialogRef<NgMatDialogModelComponent>,
    private prodServ: ProductsService
  ) {}

  ngOnInit() {}

  // del(){

  // }
}
