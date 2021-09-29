import { Todo, TodoState } from './Model'

// Interfaces
export interface ITodoService {
  add(todo: Todo): Todo
  add(todo: string): Todo
  clearCompleted(): void
  getAll(): Todo[]
  getById(todoId: number): Todo
  toggle(todoId: number): void
}

// Utilities
let _lastId = 0

function generateTodoId(): number {
  return _lastId += 1
}

function clone<T>(source: T): T {
  const clone = JSON.stringify(source)
  return JSON.parse(clone)
}

/**
 * Service delegated to add, toggle and get all Todos
 */
export default class TodoService implements ITodoService {
  
  private _todos: Todo[] = []

  /**
   * Create a TodoService
   * @param {Todo[]} todos - List of todos
   */
  constructor(todos: string[]) {
    if (todos) {
      todos.forEach(todo => this.add(todo))
    }
  }

  /**
   * Accepts a todo name or todo object
   * 
   */
  add(todo: Todo): Todo
  add(todo: string): Todo
  @log
  add(input): Todo {
    let todo: Todo = {
      id: generateTodoId(),
      name: null,
      state: TodoState.Active
    }

    if (typeof input === 'string') {
      todo.name = input
    }
    else if (typeof input.name === 'string') {
      todo.name = input.name
    } else {
      throw 'Invalid Todo name!'
    }

    this._todos.push(todo)

    return todo
  }

  /**
   * Clear all the Todos marked as 'completed'
   */
  clearCompleted(): void {
    this._todos = this._todos.filter(
      item => item.state == TodoState.Active
    )
  }

  /**
   * Get whole list of Todos
   * 
   * @return {Todo[]}
   */
  getAll(): Todo[] {
    return clone(this._todos)
  }

  /**
   * Get the Todo object matching the ID passed
   * @param {number} todoId - The todoID requested
   */
  getById(todoId: number): Todo {
    const todo = this._find(todoId)
    return clone(todo)
  }

  /**
   * Toggle the state of the matching Todo object
   * @param {number} todoId - The todoID requested
   */
  toggle(todoId: number): void {
    const todo = this._find(todoId)

    if (!todo) return
    
    switch (todo.state) {
      case TodoState.Active:
        todo.state = TodoState.Complete
        break;
      
      case TodoState.Complete:
        todo.state = TodoState.Active
        break;
    }
  }

  /**
   * Utilities
   */
  private _find(todoId: number): Todo {
    var filtered = this._todos.filter(
      item => item.id == todoId
    )

    if (filtered.length) {
      return filtered[0]
    }

    return null
  }
}


/**
 * Log decorator
 */

function log(
  target: Object,
  methodName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let originalMethod = descriptor.value

  descriptor.value = function(...args) {
    // Before execution: logging method invoked
    console.log(`${methodName}(${JSON.stringify(args)})`)

    let returnValue = originalMethod.apply(this, args)

    // After execution: logging returned value
    console.log(`${methodName}(${JSON.stringify(args)}) => ${JSON.stringify(returnValue)}`)
  }
}
