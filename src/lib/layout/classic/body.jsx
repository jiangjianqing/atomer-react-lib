import React from 'react';

export default class extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="app-body" style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

