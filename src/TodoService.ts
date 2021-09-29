import { Todo } from './Model';

export default class TodoService {
  todos: Todo[]

  constructor(todos) {
    this.todos = todos
  }
}