import React from 'react';
import Navbar from './Navbar.jsx';
import GettingStarted from './Calibration/GettingStarted.jsx';
import FavoriteMeal from './Calibration/FavoriteMeal.jsx';
import Employment from './Calibration/Employment.jsx';
import HealthInfo from './Calibration/HealthInfo.jsx';
import Name from './Calibration/Name.jsx';
import Welcome from './Welcome/Welcome.jsx';
import QuestionOne from './Questionnaire/QuestionOne.jsx';
import QuestionTwo from './Questionnaire/QuestionTwo.jsx';
import QuestionThree from './Questionnaire/QuestionThree.jsx';
import QuestionFour from './Questionnaire/QuestionFour.jsx';
import QuestionFive from './Questionnaire/QuestionFive.jsx';
import QuestionSix from './Questionnaire/QuestionSix.jsx';
import QuestionSeven from './Questionnaire/QuestionSeven.jsx';
import Recommendations from './Recommendations/Recommendations.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path='/' component={GettingStarted}/>
        <Route exact path='/name' component={Name}/>
        <Route exact path='/favoriteMeal' component={FavoriteMeal}/>
        <Route exact path='/employment' component={Employment}/>
        <Route exact path='/healthInfo' component={HealthInfo}/>
        <Route exact path='/welcome' component={Welcome}/>
        <Route exact path='/questionOne' component={QuestionOne}/>
        <Route exact path='/questionTwo' component={QuestionTwo}/>
        <Route exact path='/questionThree' component={QuestionThree}/>
        <Route exact path='/questionFour' component={QuestionFour}/>
        <Route exact path='/questionFive' component={QuestionFive}/>
        <Route exact path='/questionSix' component={QuestionSix}/>
        <Route exact path='/questionSeven' component={QuestionSeven}/>
        <Route exact path='/recommendations' component={Recommendations}/>
      </div>
    </Router>
  );
}

export default App;