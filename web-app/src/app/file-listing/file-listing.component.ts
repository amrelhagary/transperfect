import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {File} from '../model/file';

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

  }

  downloadTxt(file: File) {

  }
}
