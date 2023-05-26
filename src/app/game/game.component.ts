
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Component, inject, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from '@angular/fire/app';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard = '';
  public game: any = new Game();
  gameId: any;



  //public games$: Observable<any[]>;
  //public aCollection: any;


  //private app;
  //private db;



  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore) {
    //this.aCollection = collection(this.firestore, 'games');
    //this.games$ = collectionData(this.aCollection);
    //this.app = initializeApp(this.firebaseConfig);
    //this.db = getFirestore(this.app);
  }



  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameId = params['id'];

      this.firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.currentCards = game.currentCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        //console.log(game))
      });
    });

  }

  






  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);
      this.saveGame();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length


      setTimeout(() => {
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1500);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }

}




