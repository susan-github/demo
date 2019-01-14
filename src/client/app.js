import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>Hello World 啦啦啦</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('content'))

// if (module.hot) {
//   module.hot.accept('app/demo', () => {
//     render(app({ stores: clientStores }), document.getElementById('content'))
//   })
// }