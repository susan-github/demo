import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './html'

export const ssrRender = (req, res) => {
  // clear require() cache if in development mode
  // (makes asset hot reloading work)
  if (process.env.NODE_ENV !== 'production')
  {
    webpackIsomorphicTools.refresh()
  }

  console.log('kkkkkkkkkkk')

  res.send(`<!doctype html>
    ${ReactDOM.renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        // store={store}
        // assets 资源文件路径的key
        // source={source}
      />)}`);
}

