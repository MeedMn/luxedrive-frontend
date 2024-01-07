import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeaturedComponent } from '../featured/featured.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FeaturedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  makes: string[] = ['Make1', 'Make2', 'Make3'];
  models: string[] = ['Model1', 'Model2', 'Model3'];
  fuels: string[] = ['essence', 'diesel'];
}
