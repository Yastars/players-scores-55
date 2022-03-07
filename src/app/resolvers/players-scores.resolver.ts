import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { PlayerService } from '../services/player.service';
@Injectable()
export class PlayersScoresResolver implements Resolve<any> {
   constructor(public _playerService: PlayerService) { }
   resolve() {
      return this._playerService.getPlayersScoresApi();
   }
   
}