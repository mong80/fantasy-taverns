import { Component, OnInit } from '@angular/core';
import { TavernsService, ITavern, IRoom } from '../taverns.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html'
})
export class MyTavernComponent implements OnInit {
  rooms: IRoom[];
  tavern: ITavern;

  constructor(private tavernsService: TavernsService) {}

  ngOnInit() {
    this.tavernsService.getTavern().subscribe((taverns) => (this.tavern = taverns));
    this.tavernsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

}
