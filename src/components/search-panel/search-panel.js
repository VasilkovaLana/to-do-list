import React, { useState } from 'react';
import './search-panel.css';

export const SearchPanel = props => {
  const [term, setState] = useState('');

  const onSearchChange = e => {
    const term = e.target.value;
    setState(term);
    props.onSearchChange(term);
  };

  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="type to search"
      value={term}
      onChange={onSearchChange}
    />
  );
};
