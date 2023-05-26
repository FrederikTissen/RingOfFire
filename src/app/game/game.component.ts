
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from '@angular/fire/app';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard = '';
  public game: any = new Game();

  private firestore: Firestore = inject(Firestore);

  public games$: Observable<any[]>;
  public aCollection: any;

  firebaseConfig = {
    apiKey: "AIzaSyDUbOVyCWZinw6rlIvaeG6ePvtbHTUquZU",
    authDomain: "ring-of-fire-7736f.firebaseapp.com",
    projectId: "ring-of-fire-7736f",
    storageBucket: "ring-of-fire-7736f.appspot.com",
    messagingSenderId: "400604176139",
    appId: "1:400604176139:web:9d7996d41798f577524c0e"
  };

  private app;
  private db;



  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.aCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(this.aCollection);
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }



  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params['id']);



    });

    //this.newGame();

  }


  async newGame() {
    this.aCollection = await addDoc(collection(this.db, "games"), {
      Spiel: this.game.toJson()
    });
    console.log(this.aCollection['id']);
  }



  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length
      this.newGame();


      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

}




