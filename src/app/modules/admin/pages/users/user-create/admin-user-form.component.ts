import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" class="bg-card space-y-6 rounded-xl border border-white/10 p-6 shadow-md">
      <div>
        <label class="mb-1 block text-sm font-medium ">Username</label>
        <input
          type="text"
          [(ngModel)]="model.username"
          name="username"
          placeholder="Enter username"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium ">Email</label>
        <input
          type="email"
          [(ngModel)]="model.email"
          name="email"
          placeholder="Enter email"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium ">Password</label>
        <input
          type="password"
          [(ngModel)]="model.password"
          name="password"
          placeholder="Enter password"
          class="input bg-dark focus:ring-primary w-full rounded-lg border border-gray-700 px-4 py-2  focus:outline-none focus:ring-2"
          required />
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="btn btn-primary text-white bg-primary w-full rounded-lg py-2 px-4 font-semibold  transition hover:bg-opacity-90">
          Create Admin
        </button>
      </div>
    </form>
  `,
})
export class AdminUserFormComponent {
  model: UserDto = {
    userId: 0,
    roleId: 1,
    isActive: false,
  };

  constructor(private userService: AdminService) {}

  submit() {
    this.userService.createUser(this.model).subscribe(() => {
      alert('Admin created successfully!');
      this.model = {
        userId: 0,
        roleId: 0,
        isActive: false,
      };
    });
  }
}
