import React, { useState } from 'react';

import AppHeader from '../app-header/app-header';
import { SearchPanel } from '../search-panel/search-panel';
import { TodoList } from '../todo-list/todo-list';
import { ItemStatusFilter } from '../item-status-filter/item-status-filter';
import { ItemAddForm } from '../item-add-form/item-add-form';

import './app.css';

const App = () => {
  const [countId, setCountId] = useState(10);

  const createTodoItem = label => {
    setCountId(countId + 1);
    return {
      label,
      important: false,
      done: false,
      id: countId
    };
  };

  const [term, setTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [todoData, setTodoData] = useState([
    {
      label: 'Drink Coffee',
      important: false,
      done: true,
      id: 1
    },
    {
      label: 'Make Awesome App',
      important: true,
      done: false,
      id: 2
    },
    {
      label: 'Have a lunch',
      important: false,
      done: false,
      id: 3
    }
  ]);

  const deleteItem = id => {
    setTodoData(todoData => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return newArray;
    });
  };

  const AddItem = text => {
    const newItem = createTodoItem(text);

    setTodoData(todoData => {
      const newArr = [...todoData, newItem];

      return newArr;
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleImportant = id => {
    setTodoData(todoData => toggleProperty(todoData, id, 'important'));
  };

  const onToggleDone = id => {
    setTodoData(todoData => toggleProperty(todoData, id, 'done'));
  };

  const onSearchChange = term => {
    setTerm(term);
  };

  const onFilterChange = statusFilter => {
    setStatusFilter(statusFilter);
  };

  const search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().includes(term.toLowerCase());
    });
  };

  const onFilter = (items, statusFilter) => {
    switch (statusFilter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  };

  const visibleItems = onFilter(search(todoData, term), statusFilter);
  console.log(todoData.todoData);
  const doneCount = todoData.filter(el => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onSearchChange={onSearchChange} />
        <ItemStatusFilter
          filter={statusFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <TodoList
        todos={visibleItems}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
      />
      <ItemAddForm onItemAdded={AddItem} />
    </div>
  );
};

export default App;
