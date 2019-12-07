import React from 'react';
import ReactDOM from 'react-dom';
import {Button,TextField} from '@material-ui/core';
import './App.css';
import logo from './static/media/logo.svg';
import Cookies from 'js-cookie';
import axios from 'axios';
import LoginModal from './components/Login/LoginModal'
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
      username:'',
      password:'',
      session_id:'',
      rememberme:false
    }
  }
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    console.log(this.state.username,this.state.password)
  };
  handleClick= (e) => {
    e.preventDefault()
    console.log(this.state.username,this.state.password)
    this.initLogin()
  }
  
  
  async componentDidMount(){
    var sessioncookie=Cookies.get()
    console.log(sessioncookie.session_id);
    await console.log(this.state.isAuthenticated,this.state.session_id)
    if(sessioncookie.session_id!==undefined){
      Cookies.set('session_id', sessioncookie.session_id)
      Cookies.set('sessionid', sessioncookie.session_id)
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
            Cookies.set('session_id', sessioncookie.session_id, { expires: 60 })
            Cookies.set('sessionid', sessioncookie.session_id, { expires: 60 })
          this.auth=true
          this.sessionkey=sessioncookie.session_id
        })
        .catch(error => {
          error=JSON.stringify(error)
          console.log(error)
          // auth=true
          this.auth=false
          this.sessionkey=''
          
      })
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
    }else{
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
    }
    await console.log(this.state.isAuthenticated,this.state.session_id)
  }
  async initLogin(username,password,rememberme){
    var sessioncookie=Cookies.get()
    await axios.post('http://dms.com:8000/rest-auth/login/',{
          username: username,
          password: password
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
        if(rememberme){
          Cookies.set('session_id', response.data.session_key, { expires: 60 })
          Cookies.set('sessionid', response.data.session_key, { expires: 60 })
        }else{
          Cookies.set('session_id', response.data.session_key)
          Cookies.set('sessionid', response.data.session_key)
        }
        this.auth=true
        this.sessionkey=response.data.session_key
        var sessioncookie=Cookies.get();
        console.log("Cookies after login: ",sessioncookie);
      })
      .catch(error => {
        console.log(error)
        this.auth=false
        this.sessionkey=''
      })
      await this.setState({isAuthenticated:this.auth,session_id:this.sessionkey})
      await console.log(this.state.isAuthenticated,this.state.session_id)
  }
  handleRec = async(username,password,rememberme) => {
    console.log("Main", username,password,rememberme)
    // await this.setState({username:username,password:password,rememberme:rememberme})
    await this.initLogin(username,password,rememberme)
  }
  render() {
    return (
      <div style={{textAlign:"center",position: "absolute",top:"50%",left: "50%",transform: "translate(-50%,-50%)"}}>
      {/* <form method="POST" noValidate autoComplete="off">
        <TextField id="standard-basic" value={this.state.username} name="username" onChange={this.handleChange} label="Standard" /><br />
        <TextField id="standard-basic" value={this.state.password} name="password" onChange={this.handleChange} label="Standard" /><br />
        <TextField id="filled-basic" label="Filled" variant="filled" /><br />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" required /><br />
        <Button variant="contained" color="primary" type="submit" onClick={this.handleClick}>Hello World</Button>
      </form> */}
      <LoginModal handleRec={this.handleRec} isAuthenticated={this.state.isAuthenticated} />
        
      </div>
    );
  }
}
export default App;


// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Button,TextField} from '@material-ui/core';
// return (
//   <div style={{textAlign:"center",position: "absolute",top:"50%",left: "50%",transform: "translate(-50%,-50%)"}}>
//   <form noValidate autoComplete="off">
//     <TextField id="standard-basic" label="Standard" /><br />
//     <TextField id="filled-basic" label="Filled" variant="filled" /><br />
//     <TextField id="outlined-basic" label="Outlined" variant="outlined" /><br />
//   </form>
//   <Button variant="contained" color="primary">
//     Hello World
//   </Button>
//   </div>
// );


// export default App;