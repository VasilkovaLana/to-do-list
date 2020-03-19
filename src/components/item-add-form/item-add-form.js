import React, { useState } from 'react';
import './item-add-form.css';

export const ItemAddForm = ({ onItemAdded }) => {
  const [label, setState] = useState('');

  const onLabelChange = e => {
    setState(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    label.trim() && onItemAdded(label);
    setState('');
  };

  return (
    <form className="item-add-form d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control new-todo-label"
        onChange={onLabelChange}
        placeholder="What needs to be done"
        value={label}
      />
      <button className="btn btn-outline-secondary">Add</button>
    </form>
  );
};
