import React, { Component } from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './src/reducers';
import Router from './src/Router';


export default class App extends Component {
  componentWillMount() {
   const config = {
     apiKey: "AIzaSyAhF1NQi8FrM1s5fr9h5PDG0rO2xNMaDS8",
      authDomain: "ag-equipment-southwest.firebaseapp.com",
      databaseURL: "https://ag-equipment-southwest.firebaseio.com",
      projectId: "ag-equipment-southwest",
      storageBucket: "ag-equipment-southwest.appspot.com",
      messagingSenderId: "940822540667"
 };
 firebase.initializeApp(config);
  }
  render() {
    const store = createStore(reducers, {}, composeWithDevTools(
  applyMiddleware(ReduxThunk),
  ));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
