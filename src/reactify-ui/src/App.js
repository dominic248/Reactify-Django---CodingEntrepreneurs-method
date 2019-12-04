import React from 'react';
import './App.css';
import logo from './static/img/logo.svg';
import Cookies from 'js-cookie';
import axios from 'axios';
// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
class App extends React.Component{
  //some code
  componentWillMount(){
    axios.post('http://127.0.0.1:8000/rest-auth/login/',{
        username: 'dms',
        password: '24081999'
    },{
      headers: {
          'Content-Type': 'application/json',
      }
    },{
      withCredentials:true
    })
    .then(function (response) {
      console.log(response.data)
      console.log(response);  
    })
    .catch(function (error) {
      console.log(error.response.data)
    });
  }
  render() {
    return (
      <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
    );
  }
}
export default App;