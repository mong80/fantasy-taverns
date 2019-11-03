import { Component, OnInit } from '@angular/core';
import { TavernsService, ITavern } from '../taverns.service';

@Component({
	selector: 'app-my-tavern-header',
	templateUrl: './my-tavern-header.component.html'
})
export class MyTavernHeaderComponent implements OnInit {
	tavern: ITavern;

	constructor(private tavernsService: TavernsService) { }

	ngOnInit() {
		this.tavernsService.getTavern().subscribe((taverns) => (this.tavern = taverns));
	}

}