import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import ProductList from './modules/ProductList'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProductList}/>
      <Route path="/productlist" component={ProductList}>
        <Route path="/productlist/:catetory" component={ProductList}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
