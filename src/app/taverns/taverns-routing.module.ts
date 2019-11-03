import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common/auth/auth.guard';
import { MyTavernComponent } from './my-tavern/my-tavern.component';
import { MyTavernHeaderComponent } from './my-tavern-header/my-tavern-header.component';
import { RoomInfoComponent } from './room-info/room-info.component';
import { AddRoomStayComponent } from './add-room-stay/add-room-stay.component';

const routes: Routes = [
	{
		path: 'my-tavern',
		component: MyTavernHeaderComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: MyTavernComponent },
			{ path: 'room-info', component: RoomInfoComponent },
			{ path: 'room-info/:id', component: RoomInfoComponent, },
			{ path: 'add-room-stay', component: AddRoomStayComponent, }
		]
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class TavernsRoutingModule { }