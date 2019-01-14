import React, { Component } from 'react'
import ReactDOM from 'react-dom/server'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'

export default class Html extends Component {
  static propTypes = {
    assets    : PropTypes.object,
    component : PropTypes.object,
    store     : PropTypes.object
  }
  render () {
    const { assets, component } = this.props
    const html = (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <title>扶贫计划</title>
          {
            Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>)
          }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: ReactDOM.renderToString(component)}}/>
          {
            Object.keys(assets.javascript).map((script, i) =>
              <script src={assets.javascript[script]} key={i}/>
            )
          }
        </body>
      </html>
    )
    return html
  }
}