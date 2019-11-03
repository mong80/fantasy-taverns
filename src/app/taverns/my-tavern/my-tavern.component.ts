import { Component, OnInit } from '@angular/core';
import { TavernsService, IRoom } from '../taverns.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
	selector: 'app-my-tavern',
	templateUrl: './my-tavern.component.html'
})
export class MyTavernComponent implements OnInit {
	rooms: IRoom[];
	searchText = '';
	searchUpdated = new Subject<string>();
	subscription = new Subscription();

	constructor(private tavernsService: TavernsService, private router: Router, private authService: AuthService) { 
		this.subscription.add(
			this.searchUpdated
				.pipe(
					debounceTime(300),
					distinctUntilChanged()
				)
				.subscribe((newValue) => {
					this.tavernsService.getRooms(newValue,'').subscribe((rooms) => (this.rooms = rooms));
				})
		)
	}

	editRoom(): void {
		this.router.navigateByUrl('/login');
	}

	trackById(index: number, item: IRoom) {
		return item.ID;
	}

	search($event): void {
		this.searchUpdated.next($event.target.value);
	}

	ngOnInit() {
		this.tavernsService.getRooms('','').subscribe((rooms) => (this.rooms = rooms));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
