import React, { Component } from 'react'
import '../assets/css/Authentication.css'
var my_script = new_script('https://js.jotform.com/JotForm.js');

function new_script(src)
{
  return new Promise(function(resolve, reject)
  {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function ()
    {
      resolve();
    });
    script.addEventListener('error', function (e) {
      reject(e);
    });
    document.body.appendChild(script);
  })
};

class LogIn extends Component 
{
  constructor(props)
  {
    super(props);
    console.log('login',props);
    this.state ={
      username: "",
      password : "",
      errorCode: -1
    }
  }
  
  do_load = () => {
    var self = this;
    my_script.then(function() {
      self.setState({'status': 'done'});
    }).catch(function() {
      self.setState({'status': 'error'});
    })
  }
    onloginClick()
    {

        let url = 'https://api.jotform.com/user/login';
        var accountData  = 'username='+ this.state.username +'&password='+ this.state.password +'&access=readOnly';
          fetch(url,
            {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: 
            {
               "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: accountData, // body data type must match "Content-Type" header
            })
            .then(res => res.json())
            .then(
            (result) => 
            {
                if (result.responseCode === 200) 
                {
                  
                  this.props.onClickButton();
                }
                else if (result.responseCode === 403)
                {
                  this.props.onClickButton();
                  this.setState({errorCode: 403});
                }
                else
                {
                  this.props.onClickButton();
                  this.setState({errorCode: 404});
                }
                console.log("Login result: ",result)
            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          window.alert("Error occured: ",error)
        }
            )
             
           console.log('onClickButton',accountData);
    }
  render()
  {
    var self = this;
    if (self.state.status === 'start') 
    {
      self.state.status = 'loading';
      setTimeout(function () 
      {
        self.do_load()
      }, 0);
    }

    return (
      <div>
        <div>{self.state.status}   {self.state.status === 'done' && 'here you can use the script loaded'}</div>
        <div>
          <input className="Username" type="Text"  placeholder="Username" 
                  onChange = {(event)=> this.setState({username:event.target.value})}></input>
          <input className="Password" type="Password" placeholder="Password"
                  onChange = {(event)=>this.setState({password:event.target.value})}></input>
        </div>
        <div>
          <span className="dryp" ><a href="">Don't Remember Your Password?</a></span>
          <button className="Login" type="button" value="Login" size="lg" onClick={this.onloginClick.bind(this)}><span>Login</span></button>
        </div>
      </div>
    )
  }
}
export default LogIn;
