import React, {Component} from 'react';

import './App.css';
import Pestos from './Components/Pestos/Pestos'

class App extends Component {			//extending is important to use functions like componentDidMount


  render() {
      return (
          <div>
              <Pestos name = "mayank" />
          </div>
      );
  }
}


export default App;
