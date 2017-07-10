import React from 'react';
import $ from 'jquery';

//official site:http://plugins.krajee.com/file-input
//docs :http://blog.csdn.net/qing_gee/article/details/48949701

class FileInput extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange && this.props.onChange(e.target.checked);
    }

    componentDidMount(){
        this.$el = $(this.el);
        this.$el.fileinput();
        //this.$el.on('switchChange.bootstrapSwitch' , this.handleChange);
    }

    componentWillUnmount(){
        //this.$el.off('switchChange.bootstrapSwitch', this.handleChange);
        this.$el.fileinput('destroy');
    }

    //注意:switch会自动给input加上div wrapper
    render() {
        return (
            <input ref={el => this.el = el} type="file" />
        );
    }
}

export default FileInput;