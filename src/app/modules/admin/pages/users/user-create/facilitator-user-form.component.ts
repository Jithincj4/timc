import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facilitator-user-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" class="bg-card space-y-6 rounded-xl border border-white/10 p-6 shadow-md">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <div>
          <label class="text-sm ">Full Name</label>
          <input
            type="text"
            [(ngModel)]="model.fullName"
            name="fullName"
            class="input"
            placeholder="Full Name"
            required />
        </div>

        <div>
          <label class="text-sm ">Email</label>
          <input type="email" [(ngModel)]="model.email" name="email" class="input" placeholder="Email" required />
        </div>

        <div>
          <label class="text-sm ">Phone</label>
          <input type="tel" [(ngModel)]="model.phone" name="phone" class="input" placeholder="Phone" required />
        </div>

        <div class="md:col-span-2">
          <label class="text-sm ">User Account</label>
          <select [(ngModel)]="model.userId" name="userId" class="input" required>
            <option value="">-- Select User --</option>
            <option *ngFor="let user of users" [value]="user.userId">{{ user.username }} ({{ user.email }})</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="text-sm ">SACCO (Optional)</label>
          <select [(ngModel)]="model.saccoId" name="saccoId" class="input">
            <option value="">-- Optional --</option>
            <option *ngFor="let sacco of saccos" [value]="sacco.saccoId">{{ sacco.name }}</option>
          </select>
        </div>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="btn text-white btn-primary bg-primary w-full rounded-lg py-2 px-4 font-semibold  transition hover:bg-opacity-90">
          Create Facilitator
        </button>
      </div>
    </form>
  `,
})
export class FacilitatorUserFormComponent implements OnInit {
  model: any = {
    fullName: '',
    email: '',
    phone: '',
    userId: '',
    saccoId: '',
    username: '',
    password: '',
    roleId: 3,
  };
  users: any[] = [];
  saccos: any[] = [];

  constructor(private userService: AdminService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => (this.users = data));
    this.userService.getSaccos().subscribe((data) => (this.saccos = data));
  }

  submit() {
    this.userService.createFacilitator(this.model).subscribe(() => {
      alert('Facilitator created successfully!');
      this.model = {
        fullName: '',
        email: '',
        phone: '',
        userId: '',
        saccoId: '',
        username: '',
        password: '',
        roleId: 3,
      };
    });
  }
}
