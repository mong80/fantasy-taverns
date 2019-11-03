import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TavernsRoutingModule } from './taverns-routing.module';
import { MyTavernComponent } from './my-tavern/my-tavern.component';
import { MyTavernHeaderComponent } from './my-tavern-header/my-tavern-header.component';
import { RoomInfoComponent } from './room-info/room-info.component';
import { AddRoomStayComponent } from './add-room-stay/add-room-stay.component';

@NgModule({
    declarations: [MyTavernComponent, MyTavernHeaderComponent, RoomInfoComponent, AddRoomStayComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        TavernsRoutingModule,
    ],
})
export class TavernsModule {}