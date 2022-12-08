const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo item', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift returns the first item added to the list', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last item added to the list', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns `true` when all items on the list are done, `false` other wise', () => {
    expect(list.isDone()).toEqual(false);
    list.markDoneAt(1);
    expect(list.isDone()).toEqual(false);
    list.markAllDone();
    expect(list.isDone()).toEqual(true);
  });

  test('adding an object that is not of the `Todo` type will throw a TypeError', () => {
    let todo4 = new Object();
    expect(() => list.add(todo4)).toThrow(TypeError);
  });

  test('calling `itemAt()` returns the item at the corresponding index', () => {
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test('calling `markDoneAt()` will mark the item at the given index as done', () => {
    expect(todo1.isDone()).toEqual(false);
    list.markDoneAt(0);
    expect(todo1.isDone()).toEqual(true);
  });

  test('calling `markUndoneAt()` will mark the item at the given index as undone', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toEqual(true);
    list.markUndoneAt(0);
    expect(todo1.isDone()).toEqual(false);
  });

  test('calling `markAllDone()` marks all todos as done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toEqual(true);
    expect(todo2.isDone()).toEqual(true);
    expect(todo3.isDone()).toEqual(true);
    expect(list.isDone()).toEqual(true);
  });

  test('calling `removeAt()` removes a todo from the list', () => {
    expect(() => list.removeAt(8)).toThrow(ReferenceError);
    let removedItem = list.removeAt(0);
    expect(removedItem).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('`toString()` returns a string representation of the list', () => {
    let string = `----Today's Todos----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test ('calling `toString()` returns a string representation of the list (with items done)', () => {
    todo1.markDone();
    list.markDoneAt(1);

    let string = `----Today's Todos----
[X] Buy milk
[X] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toEqual(string);
  });

  test('calling `toString()` returns a string representation of the list (all items are done)', () => {
    let string =`----Today's Todos----
[X] Buy milk
[X] Clean room
[X] Go to the gym`

    list.markAllDone();
    expect(list.toString()).toEqual(string)
  });

  test('calling `forEach()` iterates over the elements in the list', () => {
    let testArray = [];
    list.forEach(todo => testArray.push(todo));
    expect(testArray).toEqual([todo1, todo2, todo3]);
  });

  test('calling `filter()` returns a new filtered array', () => {
    let filteredList = list.filter(todo => todo.isDone());
    expect(filteredList.toArray()).toEqual([]);

    list.markAllDone();
    let anotherFilteredList = list.filter(todo => todo.isDone());
    expect(anotherFilteredList.toArray()).toEqual([todo1, todo2, todo3]);

    expect(filteredList instanceof TodoList).toEqual(true);
  })
})