import React from 'react';
import Authentication from './Component/Authentication';
import Submission from './Component/Submission'
import Form from './Component/Form';
import './assets/css/App.css';
import './assets/css/Authentication.css';
import './assets/css/Form.css';
import './assets/css/index.css';
import './assets/css/Styles.css';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';

  const formById=(route) =>{
    console.log('route',route)
    return <Submission />
}
class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={
      isLoggedIn:false,
      isFormIn:false
    };
  }
  onClickButton = () =>
  {
    
    console.log('ssa',this.props);
    this.setState(prevState=>({
      isLoggedIn:!prevState.isLoggedIn
    }));
  }
  render()
  {
    console.log('state',this.state);
    return(
      <div >
        <Router>
          <div>
              <div className="WebPage">
                <Route path="/" exact strict render={ () => (
                  this.state.isLoggedIn?(<Redirect to="/myforms"/>):(<Authentication onClickButton={this.onClickButton}/>)
                )}/>
              </div>
              <div className="FormPage">
                <Route path="/myforms" exact strict render={ () => (
                  (<Form/>)
                )}/>
              </div>
              <div>
                <Route path="/myforms/:id" exact strict component={Submission}/>
              </div>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;