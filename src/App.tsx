import "./styles.css";
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { QuestionList } from './components/QuestionList/QuestionList';
import { QuestionnaireList } from './components/QuestionnaireList/QuestionnaireList';
import { store } from "./redux/features/store";
import { Provider } from "react-redux";
import { ExistingQuestionnaire } from "./components/Questionnaire/ExistingQuestionnaire";

import { NewQuestionnaire } from "./components/Questionnaire/NewQuestionnaire";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/questions">
                            <QuestionList/>
                        </Route>
                        <Route path="/questionnaires">
                            <QuestionnaireList/>
                        </Route>
                        <Route path="/questionnaire/:id">
                            <ExistingQuestionnaire/>
                        </Route>
                        <Route path="/:questionnaire">
                            <NewQuestionnaire/>
                        </Route>
                        <Route path="/">
                            <ul>
                                <li>
                                    <Link to={`/questions`}>
                                        Questions
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/questionnaires`}>
                                        Questionnaires
                                    </Link>
                                </li>
                            </ul>


                        </Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
