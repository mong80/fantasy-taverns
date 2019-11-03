import { Component, OnInit } from '@angular/core';
import { IRoom, TavernsService } from '../taverns.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-room-info',
	templateUrl: './room-info.component.html'
})
export class RoomInfoComponent implements OnInit {
	room: IRoom;
	private sub: any;
	frmGroup: FormGroup;

	constructor(private tavernsService: TavernsService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

	onSubmit() {
		this.room.RoomName = this.frmGroup.value.roomName;
		this.room.DailyRate = this.frmGroup.value.dailyRate;

		this.tavernsService.saveRoom(this.room).subscribe(
			(response) => {
				if (response.success) {
					this.router.navigateByUrl('/my-tavern');
				}
			},
			(error) => {
				console.log('update failed');
			},
		);
	}

	cancel(): void {
		this.router.navigateByUrl('/my-tavern');
	}

	ngOnInit() {
		this.frmGroup = this.formBuilder.group({
			roomName: ['', [Validators.required, Validators.maxLength(100)]],
			dailyRate: ['', Validators.required],
		})
		this.sub = this.route.params.subscribe(params => {
			if (params['id'] != undefined) {
				let id = params['id'];
				this.tavernsService.getRoom(id).subscribe(rooms => {
					this.room = rooms;
					this.frmGroup.controls['roomName'].setValue(this.room.RoomName);
					this.frmGroup.controls['dailyRate'].setValue(this.room.DailyRate);
				});				
			} else {
				this.room = <IRoom>{};
				this.room.ID = 0;
			}
		})
	}

	get roomName() { return this.frmGroup.get('roomName'); }
	get dailyRate() { return this.frmGroup.get('dailyRate'); }

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
