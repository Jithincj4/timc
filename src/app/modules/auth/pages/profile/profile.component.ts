import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockUserService } from '../../services/mock-user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [CommonModule],
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private userService: MockUserService) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this.userDetails = this.userService.getPatientDetails('jithincj4@gmail.com');
  }
}