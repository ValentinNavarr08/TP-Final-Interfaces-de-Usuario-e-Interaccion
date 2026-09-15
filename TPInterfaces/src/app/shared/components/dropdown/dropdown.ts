import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css'
})
export class Dropdown {
  @Input({ required: true }) options: string[] = [];
  @Input({ required: true }) selected: string = '';
  @Output() selectedChange = new EventEmitter<string>();

  isOpen = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  select(option: string): void {
    this.selected = option;
    this.selectedChange.emit(option);
    this.isOpen = false;
  }
}