import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
import HomePage from './pages/Home';
import AllUsers from './pages/AllUsers';
import ConfirmationSuccess from './pages/ConfirmationSuccess';
const cookies = new Cookies();

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token') || cookies.get('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/users' component={AllUsers} />
            <Route exact path='/confirm/:userId' component={ConfirmationSuccess} />

          </Switch>

        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App;
