import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/index';
import {ApiResponse} from './model/api.response';

@Injectable()
export class ApiService {
    private baseUrl: string = 'http://localhost:4200/api/files/'
    constructor(private http: HttpClient) {}

    getFiles(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }
}