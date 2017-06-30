
import debug from 'debug';
import React from 'react';
import $ from 'jquery';
let logger;

/**
 * offcial site :  http://select2.github.io/select2/
 *
 * 自定义 组件高度
 .select2-container .select2-choice {
      height: 34px;
      line-height: 34px;
    }

 设置当前值:
 单选：$(".js-example").select2('val','1')
 多选：$(".js-example").val(['0','2']).trigger('change')
 清空选项 :$("#c01-select").val(null).trigger("change");
 $("#c01-select").val("你的placeholder").trigger("change");//或者

 //disabled
 $("#c01-select").prop("disabled", false);//可用
 $("#c01-select").prop("disabled", true);//不可用
 */

let defaults = {
    width : "resolve", //默认select 设置为宽度自适应，缺点是auto会根据内容的大小变化
    minimumResultsForSearch : -1  //默认关闭查询框
};

class Select extends React.Component {
    constructor(props){
        super(props);
        logger = debug("component:" + this.constructor.name);
        //logger("initializing " + this.constructor.name + "ok!");
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onChange(e.target.value);
    }

    componentDidMount(){
        this.$el = $(this.el);
        if (!this.props.value){ //重要：改变select的规则，标准中select默认选择第一行，这里进行了修改，没有value输入时不选任何一行
            this.el.selectedIndex = -1;
        }
        this.$el.select2($.extend({} , defaults , this.props.config));

        this.$el.on("change" , this.handleChange);
    }

    componentWillUnmount(){
        this.$el.off("change" , this.handleChange);
        this.$el.select2("destroy");
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            //rely on jQuery's event namespacing to limit the scope to Select2 though by triggering the change.select2 event
            this.$el.trigger("'change.select2'");
        }
    }

    render() {
        return (
            <select ref={el => this.el = el} style={this.props.style} className={this.props.className}>
                {this.props.children}
            </select>
        );
    }
}

export default Select;