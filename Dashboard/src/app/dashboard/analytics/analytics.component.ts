import { Component, OnInit } from '@angular/core';
import * as highchartsData from '../../shared/data/analytics.highchartsData';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    $.getScript("./assets/js/dashboard-analytics.js")

  }

}
