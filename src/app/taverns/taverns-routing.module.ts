import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../common/auth/auth.guard';
import { MyTavernComponent } from './my-tavern/my-tavern.component';

const routes: Routes = [
    { path: 'my-tavern', component: MyTavernComponent, canActivate: [AuthGuard] },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class TavernsRoutingModule {}