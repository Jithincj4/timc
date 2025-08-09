import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DropdownOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-multi-select',
  imports: [CommonModule],
  templateUrl: './multi-select.component.html',
})
export class MultiSelectComponent {
  @Input() options: DropdownOption[] = [];
  @Input() placeholder = 'Select options';
  @Input() selectedValues: any[] = [];

  @Output() selectedValuesChange = new EventEmitter<any[]>();

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  isSelected(value: any): boolean {
    return this.selectedValues.includes(value);
  }

  toggleSelection(value: any) {
    if (this.isSelected(value)) {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    } else {
      this.selectedValues.push(value);
    }
    this.selectedValuesChange.emit(this.selectedValues);
  }

  get selectedLabels(): string {
    return this.options
      .filter(o => this.selectedValues.includes(o.value))
      .map(o => o.label)
      .join(', ') || this.placeholder;
  }
  get selectedLabelsArray(): string[] {
    return this.options
      .filter(o => this.selectedValues.includes(o.value))
      .map(o => o.label);
  }
  
  removeValue(label: string, event: MouseEvent) {
    event.stopPropagation();
    const option = this.options.find(o => o.label === label);
    if (option) {
      this.selectedValues = this.selectedValues.filter(v => v !== option.value);
      this.selectedValuesChange.emit(this.selectedValues);
    }
  }
}
