import { Component, OnInit } from '@angular/core';
import { GuestsService, IGuest } from '../../guests/guests.service';
import { TavernsService, IRoom } from '../taverns.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-room-stay',
	templateUrl: './add-room-stay.component.html'
})
export class AddRoomStayComponent implements OnInit {
	frmGroup: FormGroup;
	guests: IGuest[];
	rooms: IRoom[];

	constructor(private guestsService: GuestsService, private tavernsService: TavernsService, private router: Router, private formBuilder: FormBuilder) { }

	onSubmit() {
		console.log(this.frmGroup.value);
	}

	cancel(): void {
		this.router.navigateByUrl('/my-tavern');
	}

	ngOnInit() {
		this.frmGroup = this.formBuilder.group({
			guest: ['', Validators.required],
			room: ['', Validators.required],
			stayDateStart: ['', Validators.required],
			stayLength: ['', Validators.required]
		})
		this.guestsService.getGuests().subscribe((guests) => (this.guests = guests));
		this.tavernsService.getRooms('','DailyRate').subscribe((rooms) => (this.rooms = rooms));
	}

	get guest() { return this.frmGroup.get('guest'); }
	get room() { return this.frmGroup.get('room'); }
	get stayDateStart() { return this.frmGroup.get('stayDateStart'); }
	get stayLength() { return this.frmGroup.get('stayLength'); }

}
