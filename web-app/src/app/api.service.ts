import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/index';
import {ApiResponse} from './model/api.response';
import { File } from './model/file';

@Injectable()
export class ApiService {
    private baseUrl: string = 'http://localhost:4200/api'
    constructor(private http: HttpClient) {}

    getFiles(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl + '/files');
    }

    downloadJson(file: File) {
        const url = this.baseUrl + '/download/' + file._id + '/json';
        return this.http.get(url, {responseType: 'arraybuffer'});
    }

    downloadTxt(file: File) {
        const url = this.baseUrl + '/download/' + file._id + '/txt';
        return this.http.get(url, {responseType: 'arraybuffer'});
    }
}