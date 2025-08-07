import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from '../user-create/user-create.component';
import { MatDialog } from '@angular/material/dialog';
import { DynamicDialogComponent } from 'src/app/shared/components/dialog/dynamic-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  dialogOpen = false
  dynamicComponent: any = null
  componentData: any = null
  users: UserDto[] = [];
  loading = false;

  constructor(private adminService: AdminService,private dialog: MatDialog) {}

  ngOnInit() {
    this.loading = true;
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  onAddUser() {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      width: '500px',
      data: {
        component: CreateUserComponent,
        inputs: {}
      }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'saved') {
        this.ngOnInit(); // Reload the user list after saving
      }
    });
  }
  onEditUser(user: UserDto) {
    // Open dialog with user data or navigate to edit page
  }
  
  onDeleteUser(user: UserDto) {
    const confirmed = confirm(`Are you sure you want to delete ${user.username}?`);
    if (confirmed) {
      this.adminService.deleteUser(user.userId).subscribe(() => {
        this.loadUsers(); // reload list
      });
    }
  }
  
  loadUsers() {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  
}
