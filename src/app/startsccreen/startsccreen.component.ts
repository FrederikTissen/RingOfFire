import { Component, OnInit} from '@angular/core';
import { Route, Router, RouterEvent, RouterFeatures, RouterState } from '@angular/router';

@Component({
  selector: 'app-startsccreen',
  templateUrl: './startsccreen.component.html',
  styleUrls: ['./startsccreen.component.scss']
})

export class StartsccreenComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  newGame() {
    this.router.navigateByUrl('/game');
  }

}
