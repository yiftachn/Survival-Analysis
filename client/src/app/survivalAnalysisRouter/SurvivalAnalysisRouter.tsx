import React, { FC } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import GraphPanel from '../graphPanel/GraphPanel';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import SurvivalAnalysisForm from '../survivalAnalysisForm/SurvivalAnalysisForm';

const SurvivalAnalysisRouter: FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <SurvivalAnalysisForm />
                </Route>
                <Route path="/loading">
                    <LoadingScreen />
                </Route>
                <Route path="/result">
                    <GraphPanel />
                </Route>
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    )
};

export default SurvivalAnalysisRouter;