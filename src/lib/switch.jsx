import React from 'react';
import $ from 'jquery';

class Switch extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange && this.props.onChange(e.target.checked);
    }

    componentDidMount(){
        this.$el = $(this.el);
        this.$el.bootstrapSwitch();
        this.$el.on('change' , this.handleChange);
    }

    componentWillUnmount(){
        this.$el.off('change' , this.handleChange);
        this.$el.bootstrapSwitch('destroy');
    }

    render() {
        return (
            <div>
                <input type="checkbox" ref={ el => this.el = el} defaultChecked={this.props.checked}/>
            </div>
        );
    }
}

export default Switch;