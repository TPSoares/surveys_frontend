import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../containers/dashboard';
import Survey from '../containers/survey';

class App extends Component {

    render() {

        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/survey" component={Survey} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;