import { Component, OnInit } from '@angular/core';
import { TavernsService, ITavern, IRoom } from '../taverns.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html'
})
export class MyTavernComponent implements OnInit {
  rooms: IRoom[];
  taverns: ITavern[];

  constructor(private tavernsService: TavernsService) {}

  ngOnInit() {
    this.tavernsService.getTavern(5).subscribe((taverns) => (this.taverns = taverns));
    this.tavernsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

}
