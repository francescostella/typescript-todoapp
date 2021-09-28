import { Todo, TodoState } from './Model'
import 'https://code.jquery.com/jquery-1.12.4.min.js'

export default class TodoListComponent {
  private $element: JQuery;

  constructor(element: HTMLElement) {
    this.$element = $(element)
  }
}