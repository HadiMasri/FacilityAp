import { CategoryService } from './../services/category.service';
import { Router } from '@angular/router';
import { ReportService } from './../services/report.service';
import { map, expand } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Campus, Report, Category } from '../models/Report';
import { ToastrService } from 'ngx-toastr';
import { CompressorService } from '../services/Compressor.service';
import { EMPTY } from 'rxjs';
import {
  ELLfloor,
  NOOfloor,
  ELLLocationfloorMin_1,
  ELLLocationfloor_0,
  ELLLocationfloor_1,
  ELLLocationfloor_2,
  ELLLocationfloor_3,
  ELLLocationfloor_4,
  NOOLocationfloorMin_1,
  NOOLocationfloor_0,
  NOOLocationfloor_1,
  NOOLocationfloor_2,
  NOOLocationfloor_3,
  NOOLocationfloor_4,
  NOOLocationfloor_5,
} from '../models/groundplans';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-create-defect',
  templateUrl: './create-defect.component.html',
  styleUrls: ['./create-defect.component.css'],
})
export class CreateDefectComponent implements OnInit {
  allCategories: Category[];
  departments: string[] = [];
  selectedFile: File;
  fileName: string;
  campusen = Campus;
  selectedCampus: string;
  selectedCategorie: string;
  public campusenOption = [];
  public report: Report = new Report();
  categories: string[] = [];
  public floors: string[];
  public locaties: string[];
  public userid = localStorage.getItem('UserID');
  public userName = localStorage.getItem('UserName');

  constructor(
    private serviceReport: ReportService,
    private toastr: ToastrService,
    private router: Router,
    private compressor: CompressorService,
    private categoryService: CategoryService,
    private location: Location
  ) {}
  data: FileList;
  compressedImages = [];

  /**
   * compremeer foto om database specie te besparen
   */
  recursiveCompress = (image: File, index, array) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        // Code block after completing each compression

        this.compressedImages.push(response);
        return {
          data: response,
          index: index + 1,
          array,
        };
      })
    );
  }
  ngOnInit() {
    this.campusenOption = Object.keys(this.campusen);
    this.getAllCategories();
  }

  /**
   *
   * @param event uploaded foto
   */
  public process(event) {
    this.data = event.target.files;
    this.fileName = event.target.files[0].name;

    const compress = this.recursiveCompress(this.data[0], 0, this.data).pipe(
      expand((res) => {
        return res.index > res.array.length - 1
          ? EMPTY
          : this.recursiveCompress(this.data[res.index], res.index, this.data);
      })
    );
    compress.subscribe((res) => {
      if (res.index > res.array.length - 1) {
        // Code block after completing all compression
      }
    });
  }

  /**
   * deze function call backend function om een  reports aan te maken
   *
   */
  createReport() {
    const title = this.report.title.replace(/ {2,}/g, ' ').trim();
    const describtion = this.report.description.replace(/ {2,}/g, ' ').trim();
    this.report.title = title;
    this.report.description = describtion;
    this.serviceReport
      .createReport(
        this.report,
        this.compressedImages,
        this.userName,
        this.userid
      )
      .subscribe(
        (res) => {
          this.toastr.success('Bedankt !', 'Defect wordt toegevoegd');
          this.router.navigate(['/']);
        },
        (error) => {
          this.toastr.error('Er is een fout opgetreden.');
        }
      );
  }

  /**
   * deze function call backend function om Alle  Categorie vanuit database te halen
   *
   */
  onDepartmentChange(e) {
    const department = e.target.value;
    this.categories = [];

    this.allCategories
      .find((c) => c.department === department)
      .categories.forEach((c) => this.categories.push(c));
  }

  /**
   * get Alle categorieen van uit de database
   */

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.allCategories = data;

      data.forEach((c) => {
        if (c.department !== 'Logistieke diensten') {
          this.departments.push(c.department);
        }
      });
    });
  }
  /**
   * check welke campus is geselecteerd
   * @param event geselecteerde campus
   * @returns lijst vand verdiepingen aan de hand van geselecteerde campus
   */
  onCampusChange(event) {
    if (event.target.value === 'ELL') {
      this.floors = ELLfloor;
      this.selectedCampus = 'ELL';
    } else {
      this.floors = NOOfloor;
      this.selectedCampus = 'NOO';
    }
  }

  /**
   * check welke verdieping is geselecteerd
   * @param event geselecteerde verdieping
   * @returns lijst vand lokalen  aan de hand van geselecteerde verdieping
   */
  onEtageChange(event) {
    if (this.selectedCampus === 'ELL') {
      if (event.target.value === '-1') {
        this.locaties = ELLLocationfloorMin_1;
      } else if (event.target.value === '0') {
        this.locaties = ELLLocationfloor_0;
      } else if (event.target.value === '1') {
        this.locaties = ELLLocationfloor_1;
      } else if (event.target.value === '2') {
        this.locaties = ELLLocationfloor_2;
      } else if (event.target.value === '3') {
        this.locaties = ELLLocationfloor_3;
      } else if (event.target.value === '4') {
        this.locaties = ELLLocationfloor_4;
      }
    } else {
      if (event.target.value === '-1') {
        this.locaties = NOOLocationfloorMin_1;
      } else if (event.target.value === '0') {
        this.locaties = NOOLocationfloor_0;
      } else if (event.target.value === '1') {
        this.locaties = NOOLocationfloor_1;
      } else if (event.target.value === '2') {
        this.locaties = NOOLocationfloor_2;
      } else if (event.target.value === '3') {
        this.locaties = NOOLocationfloor_3;
      } else if (event.target.value === '4') {
        this.locaties = NOOLocationfloor_4;
      } else if (event.target.value === '5') {
        this.locaties = NOOLocationfloor_5;
      }
    }
  }
  /**
   * ga terug naar eerdere pagina
   */
  goBack() {
    this.location.back();
  }
}
