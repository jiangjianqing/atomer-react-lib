
import debug from 'debug';
import React from 'react';
import $ from 'jquery';

//checkbox和radio是input元素里两个非常特殊的type,通常使用过程中和label文字搭配，但通常会出现左右边距对不齐的问题
//这里使用了bootstrap对checkbox 和 radio的标准设置 ,见深入理解bootstrap p68

class Checkbox extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange && this.props.onChange(e.target.checked);
    }

    render() {
        return (
            <div className={this.props.isInline ? "checkbox-inline" : "checkbox"}>
                <label ><input type="checkbox" value="" onChange={this.handleChange}/>{this.props.title}</label>
            </div>
        );
    }
}

export default Checkbox;