import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RowCardComponent } from '../row-card/row-card.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/Car';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-allcars',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, RowCardComponent, MatPaginatorModule, CardComponent],
  templateUrl: './allcars.component.html',
  styleUrl: './allcars.component.css'
})
export class AllcarsComponent implements OnInit {
  constructor(private carService: CarService) { }
  cars: Car[] = [];
  pageSize = 10;
  currentPage = 0;
  paginatedCards: Car[] = [];
  filteredPaginationCards!: Car[];
  isRowShow: boolean = true;
  ngOnInit(): void {
    this.loadCars();
  }
  showCardRow() {
    this.isRowShow = true;
  }
  showCard() {
    this.isRowShow = false;
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching Cars:', error);
      }
    });
  }
  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCards = this.cars.slice(startIndex, endIndex);
    this.filteredPaginationCards = this.paginatedCards
  }

  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updatePagination();
  }
  onSearch(e: any): void {
    let searchTerm = e.target?.value
    this.filteredPaginationCards = this.paginatedCards
    this.filteredPaginationCards = this.filteredPaginationCards.filter(card =>
      card.make.includes(searchTerm) ||
      card.model.includes(searchTerm) ||
      card.price.toString().includes(searchTerm) ||
      card.year.toString().includes(searchTerm)
    );
  }
  onMinPrice(event: any) {
    this.filteredPaginationCards = this.paginatedCards
    this.filteredPaginationCards = this.filteredPaginationCards.filter(card =>
      card.price >= event.target.value
    );
  }

  onMaxPrice(event: any) {
    this.filteredPaginationCards = this.paginatedCards
    this.filteredPaginationCards = this.filteredPaginationCards.filter(card =>
      card.price <= event.target.value
    );
  }
}
