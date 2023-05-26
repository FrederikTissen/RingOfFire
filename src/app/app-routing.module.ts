import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartsccreenComponent } from './startsccreen/startsccreen.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path: '', component: StartsccreenComponent},
  {path: 'game/:id', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
