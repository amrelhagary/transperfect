import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {File} from '../model/file';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-file-listing',
  templateUrl: './file-listing.component.html',
  styleUrls: ['./file-listing.component.css']
})
export class FileListingComponent implements OnInit {

  files: File[];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getFiles()
      .subscribe((data: any[]) => {
        console.log(data);
        this.files = data;
      });
  }

  downloadJson(file: File) {
    this.apiService.downloadJson(file).subscribe(res => {
      const blob = new Blob([res], { type: 'application/json;charset=utf-8' })
      saveAs(blob, file.originalname +'.json');
    });
  }

  downloadTxt(file: File) {
    this.apiService.downloadTxt(file).subscribe(res => {
      const blob = new Blob([res], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, file.originalname +'.txt');
    });
  }
}
