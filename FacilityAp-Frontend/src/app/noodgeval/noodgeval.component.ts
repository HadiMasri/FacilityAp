import { Component, OnInit, HostListener } from '@angular/core';
import { Emergency } from '../models/Emergency';
import { EmergencyService } from '../services/emergency/emergency.service';

@Component({
  selector: 'app-noodgeval',
  templateUrl: './noodgeval.component.html',
  styleUrls: ['./noodgeval.component.css'],
})
export class NoodgevalComponent implements OnInit {
  contact: Emergency;
  facilitaireContacts;
  ictContacts;
  logistiekContacts;
  didactischContacts;
  newInnerHeight;
  newInnerWidth;
  contacts: any;
  public logistiekeContact = [];
  public ICTContact = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }

  constructor(private emergencyService: EmergencyService) {}

  ngOnInit() {
    this.emergencyService.getAllContacts().subscribe((res) => {
      this.contacts = res;
    });

    this.getFacilityContacts();
    this.getLogisticContacts();
    this.getIctContacts();
    this.getDidactischContacts();

    this.newInnerWidth = window.innerWidth;
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
