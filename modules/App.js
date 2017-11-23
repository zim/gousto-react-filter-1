import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div className="header">
        <h1>Gousto Frontend API Test</h1>

        <p>- Click Category Navigation link to filter the products by category.</p>
        <p>- Use the Search text box to show only products which feature the given text in their title.</p>
        <p>- Click Product Item to display that products description. Click again to hide description ( multiple descriptions can be shown at the same time ).</p>
        <p>* May also use the browser back and forward button to navigate history object.</p>
        
        
        {this.props.children}
      </div>
    )
  }
})
