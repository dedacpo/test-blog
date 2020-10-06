import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog/blog.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService, private sanitizer: DomSanitizer,) { }

  posts:any;
  ngOnInit() {
    this.blogService.getPosts().subscribe((ApiResponse) => {
      this.posts = ApiResponse;
    });
  }

}
