import React, {Component} from 'react';
import './App.css';
import WeatherForm from "./components/WeatherForm.js"

export default class App extends Component {

  render() {
    return (
      <div>
      <WeatherForm/>
      </div>
    )
  }
}
