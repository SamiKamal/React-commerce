import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
<Auth0Provider
    domain="dev-k-49okse.us.auth0.com"
    clientId={process.env.REACT_APP_AUTH_ID}
    redirectUri={window.location.origin}
    >
    <ProductsProvider>
        <App />
    </ProductsProvider>
</Auth0Provider>
, document.getElementById('root'))
