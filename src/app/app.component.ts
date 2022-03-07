import { BreakpointObserver } from '@angular/cdk/layout';
import { Route } from '@angular/compiler/src/core';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router
    ) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      console.log(res);
      if (res.matches && this.sidenav !== undefined) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }

      // if(this.router.url === '/')
      // this.router.navigateByUrl("/dashboard");
    });
  }
}
