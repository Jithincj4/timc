import { Component } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sacco-user-form',
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
          <label class="text-sm ">SACCO Name</label>
          <input type="text" [(ngModel)]="model.name" name="name" class="input" placeholder="SACCO Name" required />
        </div>

        <div>
          <label class="text-sm ">Address</label>
          <input type="text" [(ngModel)]="model.address" name="address" class="input" placeholder="Address" />
        </div>

        <div>
          <label class="text-sm ">Phone</label>
          <input type="tel" [(ngModel)]="model.phone" name="phone" class="input" placeholder="Phone" />
        </div>

        <div>
          <label class="text-sm ">Email</label>
          <input type="email" [(ngModel)]="model.email" name="email" class="input" placeholder="Email" />
        </div>
      </div>

      <div class="pt-4">
        <button
          type="submit"
          class="btn text-white btn-primary bg-primary w-full rounded-lg py-2 px-4 font-semibold  transition hover:bg-opacity-90">
          Create SACCO
        </button>
      </div>
    </form>
  `,
})
export class SaccoUserFormComponent {
  model: any = {
    name: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    roleId: 2,
  };

  constructor(private userService: AdminService) {}

  submit() {
    this.userService.createSacco(this.model).subscribe(() => {
      alert('SACCO created successfully!');
      this.model = {
        name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        roleId: 2,
      };
    });
  }
}
