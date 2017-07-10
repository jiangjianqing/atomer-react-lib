import React from 'react';
import $ from 'jquery';

// deps: https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js
// docs : http://blog.csdn.net/u011127019/article/details/51725081

class DateTimePicker extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        //查看这里的说明
        //http://blog.csdn.net/u011127019/article/details/51725081
        console.log(e);
        //this.props.onChange && this.props.onChange(e.target.checked);
    }

    componentDidMount(){
        this.$el = $(this.el);
        this.$el.datetimepicker();
        this.$el.on('dp.change' , this.handleChange);
    }

    componentWillUnmount(){
        this.$el.off('dp.change', this.handleChange);
        this.$el.datetimepicker('remove');
    }

    //注意:switch会自动给input加上div wrapper
    render() {
        return (
            <div ref={el => this.el = el} className='input-group date'>
                <input type='text' className="form-control"/>
                <span className="input-group-addon">
                    <span className="glyphicon glyphicon-calendar"></span>
                </span>
            </div>
        );
    }
}

export default DateTimePicker;