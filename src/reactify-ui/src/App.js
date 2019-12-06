import React from 'react';
import './App.css';
import logo from './static/media/logo.svg';
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
  constructor(props){
    super(props)
    this.state={
      isAuthenticated:false,
      session_id:'undefined'
    }
    
  }
  
  async componentDidMount(){
    var auth=false;
    var sessioncookie=Cookies.get()
    console.log(sessioncookie.session_id);
    await console.log(this.state.isAuthenticated)
    if(sessioncookie.session_id!==undefined){
      Cookies.set('session_id', sessioncookie.session_id)
      Cookies.set('sessionid', sessioncookie.session_id)
      // 
      
      await axios.get('http://dms.com:8000/api/user/current/',{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'XMLHttpRequest.withCredentials': true,
            // 'Cookie': 'sessionid='+sessioncookie.session_id
          }
        },{
          withCredentials:true
        })
        .then(response => {
          console.log("Response data: ",response.data);
          Cookies.set('session_id', sessioncookie.session_id, { expires: 7 })
          Cookies.set('sessionid', sessioncookie.session_id, { expires: 7 })
          auth=true
        })
        .catch(error => {
          error=JSON.stringify(error)
          console.log(error)
          // auth=true
          auth=false
          
      })
      await this.setState({isAuthenticated:auth})
    }else{
      await this.setState({isAuthenticated:false})
    }
    
    if(!this.state.isAuthenticated){
      await axios.post('http://dms.com:8000/rest-auth/login/',{
          username: 'dms',
          password: '24081999'
      },{
        headers: {
            'Content-Type': 'application/json',
        }
      },{
        withCredentials:true
      })
      .then(response => {
        // var responsed=JSON.stringify(response)
        console.log(response);  
        Cookies.set('session_id', response.data.session_key, { expires: 7 });
        Cookies.set('sessionid', response.data.session_key, { expires: 7 })
        auth=true
        var sessioncookie=Cookies.get();
        console.log("Cookies after login: ",sessioncookie);
      })
      .catch(error => {
        console.log(error.response.data)
        auth=false
      })
      await this.setState({isAuthenticated:auth})
    }
    await console.log(this.state.isAuthenticated)
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