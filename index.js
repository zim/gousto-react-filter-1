import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'
import Repo from './modules/Repo'
import Home from './modules/Home'
import ProductList from './modules/ProductList'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProductList}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
      <Route path="/productlist" component={ProductList}>
        <Route path="/productlist/:catetory" component={ProductList}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))
