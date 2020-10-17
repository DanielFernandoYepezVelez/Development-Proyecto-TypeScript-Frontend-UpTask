import { Component, OnInit } from '@angular/core';

/* Services */
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  // public projectName:
  constructor(private projectService: ProjectService) { 

  }

  ngOnInit(): void { }
}
