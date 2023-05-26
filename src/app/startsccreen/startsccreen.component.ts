import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Route, Router, RouterEvent, RouterFeatures, RouterState } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startsccreen',
  templateUrl: './startsccreen.component.html',
  styleUrls: ['./startsccreen.component.scss']
})

export class StartsccreenComponent implements OnInit {

  constructor(private router: Router, private firestore: AngularFirestore) { }


  ngOnInit(): void {
  }

  /* async newGame() {
     this.aCollection = await addDoc(collection(this.db, "games"), {
       Spiel: this.game.toJson()
     });
     console.log(this.aCollection['id']);
   }*/

  newGame() {
    let game: any = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo: any) =>
        this.router.navigateByUrl('game/' + gameInfo.id)
  );
}

}
