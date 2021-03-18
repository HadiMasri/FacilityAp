import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Emergency } from '../../models/Emergency';
import { EmergencyService } from '../../services/emergency/emergency.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-contact-dialog',
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.css'],
})
export class UpdateContactDialogComponent implements OnInit {
  facilitaireContacts;
  ictContacts;
  logistiekContacts;
  didactischContacts;
  newInnerHeight;
  newInnerWidth;
  contacts: any;
  public logistiekeContact = [];
  public ICTContact = [];
  dpt;
  isLoaded: boolean;
  contact: Emergency;
  departments = [
    'Facilitaire diensten',
    'ICT diensten',
    'Logistieke diensten',
    'Didactisch diensten',
  ];
  selectedDepartment: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line: max-line-length
    public dialogRef: MatDialogRef<UpdateContactDialogComponent>,
    private emergencyService: EmergencyService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getContact();
  }

  /**
   * De getContact functie haalt een contact op vanuit de database op basis van een id
   */
  getContact() {
    this.emergencyService.getContact(this.data.id).subscribe((data: any) => {
      if (data !== null) {
        this.contact = data;
        this.isLoaded = true;
      } else {
        this.isLoaded = false;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  onChange(department) {
    this.selectedDepartment = department;
  }

  /**
   * De updateContact functie zorgt voor het aanpassen van wijzigingen op een contact
   */
  updateContact() {
    this.emergencyService.updateContact(this.contact).subscribe(
      (res) => {
        this.toastr.success('De taak werd gewijzigd.', 'Succes!');
        location.reload();
      },
      (error) => {
        this.toastr.error('Er is een fout opgetreden.', 'Error!');
      }
    );
  }

  /**
   * De deleteContact functie zorgt voor het verwijderen van een contact op basis van een 'id'
   */
  deleteContact() {
    this.emergencyService.deleteContact(this.contact.id).subscribe((res) => {});
  }

  /**
   * Deze functie haalt alle contacten onder facilitaire diensten op
   */
  getFacilityContacts() {
    const department = 'Facilitaire diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.facilitaireContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder logistieke diensten op
   */
  getLogisticContacts() {
    const department = 'Logistieke diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.logistiekContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder ICT diensten op
   */
  getIctContacts() {
    const department = 'ICT diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.ictContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder didactisch diensten op
   */
  getDidactischContacts() {
    const department = 'Didactisch diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.didactischContacts = res;
      });
  }
}
