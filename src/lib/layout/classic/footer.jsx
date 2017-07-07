import React from 'react';

export default class extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <footer className="app-footer" style={this.props.style}>
                {this.props.children}
            </footer>
        );
    }
}

