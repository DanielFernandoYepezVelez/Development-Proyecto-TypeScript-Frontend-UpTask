import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  private name: string;
  private lastName: string;
  private date: number;

  constructor() {
    this.name = 'Daniel Fernando';
    this.lastName = 'Yepez Vélez';
    this.date = new Date().getFullYear();
  }

  get Name() {
    return this.name;
  }

  get LastName() {
    return this.lastName;
  }

  get Date() {
    return this.date;
  }
}
