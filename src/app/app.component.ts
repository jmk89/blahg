import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blahg';
  posts = [
    { name: "Post 1", content: "the first few words", date: new Date("2021-12-01") },
    { name: "Post 2", content: "some intro words", date: new Date("2021-12-02") },
    { name: "Post 3", content: "a hot take woah", date: new Date("2021-12-03") },
    { name: "Post 4", content: "testing waters", date: new Date("2021-12-04") },
  ]


}
