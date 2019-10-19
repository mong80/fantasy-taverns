import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TavernsRoutingModule } from './taverns-routing.module';
import { MyTavernComponent } from './my-tavern/my-tavern.component';

@NgModule({
    declarations: [MyTavernComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        TavernsRoutingModule,
    ],
})
export class TavernsModule {}