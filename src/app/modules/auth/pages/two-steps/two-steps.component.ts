import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-two-steps',
  templateUrl: './two-steps.component.html', // Placeholder for missing template
  imports: [FormsModule, RouterLink, ButtonComponent],
})
export class TwoStepsComponent implements OnInit {
  constructor() {}
  public inputs = Array(6);

  ngOnInit(): void {}
}
