import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/home/home';
import AboutPage from './components/about/about';
import Header from './components/common/Header';
import CoursesPage from './components/courses/CoursesPage';
import ConfigureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
const store = ConfigureStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/home' component={HomePage} />
            <Route path='/about' component={AboutPage} />
            <Route path='/courses' component={CoursesPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </ReduxProvider>
  );
}

export default App;