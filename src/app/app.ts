import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from "@angular/common";

import { Header } from "./header/header";
import { Router, NavigationEnd } from '@angular/router';
import { HeaderDoctor } from "./header-doctor/header-doctor";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, HeaderDoctor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
  
  
}
