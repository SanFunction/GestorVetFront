import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // breakpoint: any;

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Inicio',
      icon: 'home',
      routeUrl: '',
    };
  }

  ngOnInit(): void {}

  //   ngInicio() {
  //     this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  // }

  //   onResize(event) {
  //    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  // }
}
