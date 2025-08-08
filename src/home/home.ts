import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from "../app/navbar/navbar";

@Component({
  selector: 'app-home',
  imports: [RouterLink, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  resumeTemplates:Array<number> = new Array(10)
}
