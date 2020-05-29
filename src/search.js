'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './images/logo.jpg';
import './search.css';
class Search extends React.Component {
  render() {
    return <div class="search-text"> search Text img  preferct<img src={logo} /></div>;
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
