let React = require('react');  //规则1：React Must Be in Scope
let AppComponent = require('./app');
const ReactDOM = require("react-dom");

ReactDOM.render(<AppComponent/>, document.getElementById('app'));