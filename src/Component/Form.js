import React, { Component } from 'react'
import "../assets/css/Form.css";
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import Submission from './Submission';
import './../assets/css/App.css';
import '../assets/css/index.css'
class Form extends Component 
{
    state={
      formid: "",
      title : "",
      height : '',
      errorCode: -1,
    }
    constructor(props)
    {
      super(props);

      this.state={
        status:'start',
        forms:[]
      }
    }

    componentDidMount = () =>
    {
      this.onFormClick();
    }

    goToSubmission(event) {
      const form_id = event.currentTarget.getAttribute('data-form');
    }

    onFormClick ()
    {
      let url = 'https://api.jotform.com/user/forms&apiKey=4d4b60a6c651ba64988bde2ce0137eaa&limit=100';
      var formData='formid='+ this.state.formid +'&title='+ this.state.title +'&height=' + this.state.height;
      fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: 
          {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          }
      })
      .then(res => res.json())
      .then(
        (result) =>
        {
          if (result.responseCode === 200)
          {
            this.setState({forms:result.content});
          }
          else if (result.responseCode === 403)
          {
            this.setState({errorCode: 403});
          }
          else 
          {
            this.setState({ errorCode: 404});
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) =>{
          window.alert("Error occured: ",error)
        }
      )
      /*componentWillMount() 
      {
        console.log('componentWillMount is called');
        const script = document.createElement('script');
        script.src = 'https://foo.azurewebsites.net/foo.js';
        document.body.appendChild(script);
      }
      componentDidMount()
      {
        console.log('componentDidMount is called');
        window.foo.render(
        {
          FormArray:{forms},
        },'#container');
      }
      console.log('onClickButton',this.props.onFormClickButton);*/


    }
    render() 
    {
      return(
        <div>
          <div >
            <Header/>
          </div>
          <div className="myforms">
            <ul >
              {this.state.forms.map(forms=>
              <li key={forms.id} >
                <NavLink className="btn btn-success btn-lg" to={`/myforms/${forms.id}`}>
                  {forms.title}
                </NavLink>
              </li>
              )}
            </ul>
          </div>
        </div>
      )
    }
}

export default Form;
