import { Component, Input, OnInit } from '@angular/core';
import { PostData2 } from 'src/app/shared/services/firestorePost.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post: PostData2;

  constructor() { }

  ngOnInit(): void {
  }

}
