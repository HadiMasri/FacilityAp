import { Component, OnInit, Inject } from '@angular/core';
import { Category } from '../models/Report';
import { CategoryService } from '../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: Category;
  newCategory: string;
  selectedOptions: string[];

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.category = data.category;
  }

  ngOnInit() {}

  addCategory(): void {
    this.categoryService
      .addCategory(this.category.id, this.newCategory)
      .subscribe((res) => {
        this.toastr.success('De subcategorie werd toegevoegd!', 'Bedankt!');
      });

    this.closeDialog();
    location.reload();
  }

  deleteCategory(): void {
    this.selectedOptions.forEach((v) => {
      this.categoryService
        .deleteCategory(this.category.id, v)
        .subscribe((res) => {
          this.toastr.success('De subcategorie werd verwijderd!', 'Bedankt!');
        });
    });

    this.closeDialog();
    location.reload();
  }

  deleteDepartment(): void {
    this.categoryService.deleteDepartment(this.category.id).subscribe((res) => {
      this.toastr.success('De categorie werd verwijderd!', 'Bedankt!');
    });

    this.closeDialog();
    location.reload();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
