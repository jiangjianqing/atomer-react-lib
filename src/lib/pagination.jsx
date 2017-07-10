import React from 'react';
import $ from 'jquery';

class Switch extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        //this.props.onChange && this.props.onChange(e.target.checked);
    }

    componentDidMount(){
        //this.$el = $(this.el);
        //this.$el.bootstrapSwitch();
        //this.$el.on('switchChange.bootstrapSwitch' , this.handleChange);
    }

    componentWillUnmount(){
        //this.$el.off('switchChange.bootstrapSwitch', this.handleChange);
        //this.$el.bootstrapSwitch('destroy');
    }

    //注意:switch会自动给input加上div wrapper
    render() {
        return (
            <ul className="pagination">
                <li><a href="#">&laquo;</a></li>
                <li className="active"><a href="#">1</a></li>
                <li className="disabled"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">&raquo;</a></li>
            </ul>
        );
    }
}

export default Switch;