import { Component, model } from '@angular/core';

@Component({
  selector: 'app-book-input',
  imports: [],
  templateUrl: './book-input.component.html',
  styleUrl: './book-input.component.scss'
})
/* Component created to test new way of communication between components*/
export class BookInputComponent {

  bookTitle = model('');

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.bookTitle.set(value);
  }

}
