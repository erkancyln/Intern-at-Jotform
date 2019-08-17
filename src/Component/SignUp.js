import React, { Component } from 'react'
class SignUp extends Component 
{

  constructor(props)
  {
    super(props);
    console.log('login',props);
    this.state ={
      username: "",
      email:"",
      password : "",
      isSignUp:false,
      errorCode: -1
    }
  }

  onSignUpClick()
  {
    let url = 'https://api.jotform.com/user/register';
    var SignUpData  = 'username='+ this.state.username +'&email='+ this.state.email + '&password='+ this.state.password;
          fetch(url,
            {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: 
            {
               "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            body: SignUpData, // body data type must match "Content-Type" header
            })
            .then(res => res.json())
            .then(
            (result) => 
            {
                if (result.responseCode === 200) 
                {
                  
                  this.setState.isSignUp===true;
                }
                else if (result.responseCode === 403)
                {
                  this.setState.isSignUp===true;
                  this.setState({errorCode: 403});
                }
                else
                {
                  this.setState.isSignUp===true;
                  this.setState({errorCode: 404});
                }
                console.log("signUp result: ",result)
            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          window.alert("Error occured: ",error)
        }
            )
             
           console.log('onClickButton',SignUpData);

  }


  render() {
    return (
      <div>
        <div>
          <input className="Username" type="Text"  placeholder="Username" 
                  onChange = {(event)=> this.setState({username:event.target.value})}>
          </input>
          <input className="Email" type="Text"  placeholder="email" 
                  onChange = {(event)=> this.setState({email:event.target.value})}>
          </input>
          <input className="Password" type="Password" placeholder="Password"
                  onChange = {(event)=>this.setState({password:event.target.value})}>
          </input>
        </div>
        <div>
          <button className="SignUp" type="button" value="SignUp" onClick={this.onSignUpClick.bind(this)}><span>SignUp</span></button>
        </div>
      </div>
    )
  }
}
export default SignUp;