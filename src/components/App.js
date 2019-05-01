import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from '../containers/dashboard';

class App extends Component {

    render() {

        return (
            <div>
                <BrowserRouter>
                    <div>
                        {/* <Header /> */}
                        <Route exact path="/" component={Dashboard} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default App;