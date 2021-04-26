import Exam from "./Components/Exam";
import Tutorial from "./Components/Tutorial";
import Navbar from "./Components/Navbar";
import About from './pages/about';
import Feedback from './pages/feedback';
import Contact from './pages/contact'
import "./Styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RoundedCornerTwoTone } from "@material-ui/icons";

function App() {
  return (
    <div className="App">
      {/*<ExamDisplay/>*/}
      <Router>
        <Navbar />
        <Switch>
          <Route path="/mix" component={Exam} />
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/about" component={About} />
          <Route path="/feedback" component={Feedback}/>
          {/* <Route path="/contact" component={Contact}/> */}
          <Route path="/" component={Exam}/>
        </Switch>
      </Router>
      {/* <Exam /> */}
    </div>
  );
}

export default App;
