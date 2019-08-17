import React, { Component } from 'react'
import Question from './Question';
class Submission extends Component
{
    state={
        id: "",
        ip:"",
        created_at : '',
        errorCode: -1
    }
    
    
    constructor(props) 
    {
      super(props);
      this.state ={
        status: 'start',
        submissions:[]
        }
        
     
    }
    componentWillMount = () => 
    {
        this.onSubmissionClick();
    }
    
    onSubmissionClick()
    {
        const formItem=this.props;
        const formid=formItem.match.params.id;
        console.log('submission clicke geldı',formid)
        let url = "https://api.jotform.com/form/" + formid + "/submissions?apiKey=4d4b60a6c651ba64988bde2ce0137eaa&limit=100";
        const SubmissionData = 'id='+this.state.id + '&formid='+this.state.formid  + '&ip='+ this.state.ip +'&created_at='+ this.state.created_at + '&answers='+ this.state.answers;
        console.log(SubmissionData); 
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
          if (result.responseCode === 200)
          {
            this.setState({submissions:result.content});
          }
          else if (result.responseCode === 403)
          {
            this.setState({errorCode: 403});
          }
          else 
          {
            this.setState({errorCode: 404});
          }
          console.log("submissions result: ",this.state.submissions)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) =>{
          window.alert("Error occured: ",error)
        }
    )
    console.log("SubmissionData",SubmissionData);
    
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
    const formItem=this.props;
    const formid=formItem.match.params.id;
        console.log('submission rendera geldı',formid);
    const SubmissionArray=this.state.submissions.map(submissions=>
      <Question
          key={submissions.id}
          questionFormid={submissions.form_id}
          ip={submissions.ip}
          createdAt={submissions.created_at}/>
      )
    return(
      <div className="myforms">
        {SubmissionArray}
      </div>
    )
  }
}
export default Submission;
