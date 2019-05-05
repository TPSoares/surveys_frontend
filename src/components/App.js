import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../containers/dashboard';
import Survey from '../containers/survey';
import Newsurvey from '../containers/newsurvey';
import Edit from '../containers/edit';

class App extends Component {

    render() {

        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/survey" component={Survey} />
                        <Route exact path="/newsurvey" component={Newsurvey} />
                        <Route exact path="/edit" component={Edit} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;