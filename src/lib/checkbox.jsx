
import debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import $ from 'jquery';

import style from './style.css';

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
        let inlineSuffix = this.props.inline ? "-inline" : "";

        let checkboxClass = classNames({[`checkbox${inlineSuffix}`]: true} );
        return (
            <div className={checkboxClass}>
                <label ><input type="checkbox" value="" onChange={this.handleChange}/>{this.props.title}</label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    inline : PropTypes.bool
};

export default Checkbox;