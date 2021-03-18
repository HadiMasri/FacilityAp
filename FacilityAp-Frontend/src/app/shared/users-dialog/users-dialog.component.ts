import { Component, OnInit, Inject } from '@angular/core';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css'],
})
export class UsersDialogComponent implements OnInit {
  /**
   * variables
   */
  public newUser: User;
  assignToUserInformation: User;
  selectUserInformation: User;
  UsersList: User[] = [];
  newInnerHeight;
  selectUsersList: User[] = [];
  newInnerWidth;
  userId: string;
  userName: string;
  role: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = this.data.role;
    this.getAllUsers();
    this.getAllUsersFromAzure();
  }

  getAllUsers() {
    this.authService.getUsersListRoles().subscribe((res) => {
      res.forEach((element) => {
        if (element.role === this.role) {
          this.assignToUserInformation = {
            id: element.id,
            email: element.email,
            name: element.name,
          };
          this.UsersList.push(this.assignToUserInformation);
        } else {
          this.selectUserInformation = {
            id: element.id,
            email: element.email,
            name: element.name,
          };
          this.selectUsersList.push(this.selectUserInformation);
        }
      });
    });
  }

  addMember() {
    this.authService
      .addMemberToRole(this.userId, this.role, this.newUser)
      .subscribe((res) => {
        location.reload();
        this.toastr.success(`${this.userName} is toegevoegd.`);
      });
  }

  removeMember(id, name) {
    this.authService.removeUsersFromRoles(id).subscribe((res) => {
      location.reload();
      this.toastr.success(`${name} is verwijderd.`);
    });
  }

  getAllUsersFromAzure() {
    this.authService.getAllUsers().subscribe((res: any) => {
      res.value.forEach((element) => {
        if (element.role === this.role) {
          this.assignToUserInformation = {
            id: element.id,
            email: element.userPrincipalName,
            name: element.displayName,
          };
          this.UsersList.push(this.assignToUserInformation);
        } else {
          this.selectUserInformation = {
            id: element.id,
            email: element.userPrincipalName,
            name: element.displayName,
          };
          this.selectUsersList.push(this.selectUserInformation);
        }
      });
    });
  }

  /**
   * als we een employee geselecteerd hebben van de select opties,
   *  dan nemen we hier het id en naam van de geselecteerd employee
   * @param e heeft informatie zoals id en de naam van de geselecteerde optie
   */
  onUserChange(e) {
    this.userName = e.target.options[e.target.options.selectedIndex].text;
    this.userId = this.newUser.id;
  }
}
