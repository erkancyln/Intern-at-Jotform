import React, { Component } from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import logo from '../assets/img/Jotform.jpeg'
class Authentication extends Component
{
  constructor(props)
  {
    super(props);
    console.log('authentication',props);
  }
  render()
  {
    var {onClickButton} = this.props;
    console.log("a",onClickButton);
    return (
          <div className="Container">
            <div>
              <img className="logo" src={logo}/>
            </div>
            <div>
            <LogIn onClickButton={onClickButton} width="60px" height="40px"/>
            </div>
            <div>
            <SignUp/>
            </div>
          </div>
    )
  }
}
export default Authentication;