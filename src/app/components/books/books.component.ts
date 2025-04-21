import { httpResource } from '@angular/common/http';
import { Component } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  apiUrl = 'https://www.freetestapi.com/api/v1/books';

  //httpResource should be extracted to a service
  books = httpResource< Book[]>(
    () => `${this.apiUrl}`, {defaultValue: []}
  )


}
