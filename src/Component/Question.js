import React, { Component } from 'react'
import Answers from './Answers';
import SubmissionItem from './Answers';
class Question extends Component 
{
    state=
    {
      qid:"",
      errorCode: -1
    }

    constructor(props)
    {
      super(props);
      this.state ={
        status: 'start',
        questions:[]
      }
    }
    componentDidMount = () =>
    {
      this.onQuestionClick();
    }
    

    onQuestionClick()
    {
      const questionFormid=this.props.questionFormid;
        console.log('QuestionClicke geldi',questionFormid);
        let url = 'https://api.jotform.com/form/'+questionFormid+'/questions?apiKey=4d4b60a6c651ba64988bde2ce0137eaa&limit=100';
        const QuestionData = 'qid='+this.state.qid;
        fetch(url,
            {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: 
            {
               "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
            })
            .then(res => res.json())
      .then(
        (result) =>
        {
          console.log(result);
          if (result.responseCode === 200)
          {
            this.setState({questions:result.content});
          }
          else if (result.responseCode === 403)
          {
            this.setState({errorCode: 403});
          }
          else 
          {
            this.setState({errorCode: 404});
          }
          console.log("questions result: ",this.state.questions)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) =>{
          window.alert("Error occured: ",error)
        }
      )
    console.log("QuestionData",QuestionData);
    
    /*
    componentWillMount() 
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
      formId:{formId},
    }, '#container');
    */


    }
  render() 
  {
    const {questionFormid,ip,createdAt}=this.props;
    console.log('props',this.props);
    console.log('questionFormid',questionFormid);
    console.log('ip',ip);
    console.log('created_at',createdAt);
    console.log('Question rendera geldi',questionFormid);
    const { questions } = this.state;
    const questionsArray=Object.keys(questions).map((question) =>
    {
      return (
      <li key={questions[question].qid}>
        <button>{questions[question].qid}</button><br/>
        <button>{questions[question].name}</button><br/>
      </li>
      );
    });
    return(
      <div className="myquestions">
        <ul >
          {questionsArray}
          <button>{ip}</button>
          <button>{createdAt}</button>
          <button>{questionFormid}</button>
        </ul>
      </div>
    )
  }
}
export default Question;