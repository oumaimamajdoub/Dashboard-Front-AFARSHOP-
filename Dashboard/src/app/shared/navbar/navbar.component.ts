import { Component , OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import {AuthService} from "../../application/service/auth.service";
import {Route, Router} from "@angular/router";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

    constructor(public sidebarservice: SidebarService,private auth:AuthService,private route:Router) { }

    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {

        /* Search Bar */
        $(document).ready(function () {
            $(".mobile-search-icon").on("click", function () {
                $(".search-bar").addClass("full-search-bar")
            }),
            $(".search-close").on("click", function () {
                $(".search-bar").removeClass("full-search-bar")
            })
        });

    }
  logou() {
    this.auth.logOut();
    this.route.navigate(['login'])
  }
}
