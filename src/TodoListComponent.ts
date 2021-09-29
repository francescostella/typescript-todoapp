import { Todo, TodoState } from './Model.js'
import 'https://code.jquery.com/jquery-1.12.4.min.js'

export default class TodoListComponent {
  private $element: JQuery;

  constructor(element: HTMLElement) {
    this.$element = $(element)
  }

  render(todos) {
    this.$element.html('')

    if (!todos.length) {
      this.$element.html(`
        <div class="col-lg-6 mx-auto text-center">
          <p class="lead mt-4 mb-4">You've completed everything you needed to do!</p>
        </div>
      `)
      return
    }

    for (let index in todos) {
      let todo = todos[index]
      this.renderTodo(todo).appendTo(this.$element)
    }
  }

  private renderTodo(todo) {
    return $(`
      <label class="list-group-item d-flex gap-3">
        <input class="form-check-input flex-shrink-0" type="checkbox" value="" ${todo.state === 2 ? 'checked=""' : '' } style="font-size: 1.375em;">
        <span class="pt-1 form-checked-content">
          <strong>${todo.name}</strong>
        </span>
      </label>
    `).on('click', function() {
      const event = new CustomEvent('todo-toggle', {
        bubbles: true,
        detail: {
          todoId: todo.id
        }
      })
      
      this.dispatchEvent(event);
    });
  }
}