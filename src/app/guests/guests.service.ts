import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IGuest {
	ID: number;
	GuestName: string,
	GuestStatus: string,
	Birthday: Date,
	Cakeday: Date,
	VIP: boolean
}

@Injectable({
	providedIn: 'root'
})
export class GuestsService {
	constructor(private http: HttpClient) { }

	getGuests(): Observable<IGuest[]> {
        return this.http.get<IGuest[]>('http://localhost:3000/guests')
    }
}
