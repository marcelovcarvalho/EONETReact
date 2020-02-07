import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Event } from './components/Event';

import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/event/:id' component={Event} />
      </Layout>
    );
  }
}
