import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  date: number;
  name: string;

  constructor() {
    this.date = new Date().getFullYear();
    this.name = 'Daniel Fernando Yepez Vélez';
  }

  ngOnInit(): void {}
}
