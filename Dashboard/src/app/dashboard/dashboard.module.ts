import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { DashboardRoutingModule } from './dashboard-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { DefaultComponent } from './default/default.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
     DefaultComponent, ECommerceComponent, AnalyticsComponent, DigitalMarketingComponent, HumanResourcesComponent, CreateUserComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    PerfectScrollbarModule

  ]
})
export class DashboardModule { }
