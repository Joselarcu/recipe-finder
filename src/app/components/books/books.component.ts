import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookInputComponent } from '../book-input/book-input.component';

@Component({
  selector: 'app-books',
  imports: [BookInputComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  apiUrl = 'https://www.freetestapi.com/api/v1/books';

  bookTitle = signal('')

  //httpResource should be in a service
  books = httpResource< Book[]>(
    () => `${this.apiUrl}`, {defaultValue: []}
  )


}
