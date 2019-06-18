import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './stylesheets/App.scss';
import Header from './components/common/Header';
import PoliciesPage from './components/policies/PoliciesPage';
import ConfigureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import QuotesPage from './components/quotes/QuotesPage';
import AppetitePage from './components/quote-flow/appetite/AppetitePage';

const store = ConfigureStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={QuotesPage} />
            <Route path='/Quotes' component={QuotesPage} />
            <Route path='/Policies' component={PoliciesPage} />
            <Route path='/new-quote' component={AppetitePage} />
          </Switch>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  );
}

export default App;