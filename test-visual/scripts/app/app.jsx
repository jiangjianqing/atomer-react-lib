import React from 'react';

import {Layout} from '../../../src/lib';


class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout.Classic.Container style={{background : "#e5edef" , border : "1px solid red"}}>
                <Layout.Classic.Header style={{border : "1px solid blue"}}>
                    header
                </Layout.Classic.Header>
                <Layout.Classic.Body style={{marginTop : "3px" , border : "1px solid"}}>
                    <Layout.Classic.Sidebar style={{border : "1px solid"}}>
                        sidebar
                    </Layout.Classic.Sidebar>
                    <Layout.Classic.Content style={{border : "1px solid"}}>
                        content
                    </Layout.Classic.Content>
                </Layout.Classic.Body>
                <Layout.Classic.Footer>
                    Copyright © 2017 - &nbsp;
                    <a>Nest团队</a>
                </Layout.Classic.Footer>
            </Layout.Classic.Container>
        );
    }
}

module.exports = App;