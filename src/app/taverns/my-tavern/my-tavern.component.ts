import { Component, OnInit } from '@angular/core';
import { TavernsService, IRoom } from '../taverns.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html'
})
export class MyTavernComponent implements OnInit {
  rooms: IRoom[];

  constructor(private tavernsService: TavernsService) {}

  ngOnInit() {
    this.tavernsService.getRooms().subscribe((rooms) => (this.rooms = rooms));
  }

}
