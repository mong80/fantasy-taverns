import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITavern {
    ID: number;
    TavernName: string;
}

export interface IRoom {
    ID: number;
    RoomName: string;
    RoomStatus: boolean;
    TavernID: number;
    DailyRate: number;
}

@Injectable({
    providedIn: 'root',
})
export class TavernsService {
    constructor(private http: HttpClient) {}

    getTaverns(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>('http://localhost:3000/taverns')
    }

    getTavern(): Observable<ITavern> {
        return this.http.get<ITavern>('http://localhost:3000/my-tavern')
    }

    getRooms(name: string, orderBy: string): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(`http://localhost:3000/my-tavern/rooms?Name=${name}&OrderBy=${orderBy}`)
    }

    getRoom(id: string): Observable<IRoom> {
        return this.http.get<IRoom>('http://localhost:3000/my-tavern/rooms/' + id)
    }

    saveRoom(data): Observable<any> {
        return this.http.post<any>('http://localhost:3000/my-tavern/rooms', data)
    }
}