import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import reportWebVitals from './reportWebVitals'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { baseUrl } from './constants/constants'

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

reportWebVitals()
