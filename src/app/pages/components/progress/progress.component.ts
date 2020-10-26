import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const ancho = document.querySelector('.barra-avance p');
    console.log(ancho);
  }
}
