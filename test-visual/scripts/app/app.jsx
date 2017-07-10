import React from 'react';

import {Layout , DateTimePicker , Checkbox , Pagination} from '../../../src/lib';
import Radio from "../../../src/lib/radio";
import FileInput from "../../../src/lib/file-input";
import Modal from "../../../src/lib/modal";


class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Layout.Classic.Container style={{background : "#e5edef" , border : "1px solid red"}}>
                <Layout.Classic.Header style={{border : "1px solid blue"}}>
                    header
                    <Modal isShow={true}/>
                </Layout.Classic.Header>
                <Layout.Classic.Body style={{marginTop : "3px" , border : "1px solid"}}>
                    <Layout.Classic.Sidebar style={{border : "1px solid"}}>
                        sidebar
                    </Layout.Classic.Sidebar>
                    <Layout.Classic.Content style={{border : "1px solid"}}>
                        content
                        <DateTimePicker></DateTimePicker>
                        <label><input type="checkbox" value="" />原生checkbox</label>
                        <label><input type="radio" value="" />原生radio</label>
                        <div>
                            <Checkbox isInline={true} title="规范化checkbox"/>
                            <Checkbox isInline={true} title="测试3"/>
                            <Radio isInline={true} name="gender" value="female" title="规范化(女)"/>
                            <Radio isInline={true} name="gender" value="male" title="男"/>
                        </div>
                        <FileInput/>
                        <Pagination></Pagination>
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