import { Router } from '@angular/router';
import { Example2Service } from './../services/example2.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private example2Service: Example2Service, private router: Router) {
    this.place$ = this.example2Service.shareData$;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 2000);
  }

  // place: string = '';
  place$!: Observable<string>;

}
