import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="container">
      <app-header></app-header>
      <router-outlet></router-outlet>
    </div>
  `
})
export class ShellComponent {}
