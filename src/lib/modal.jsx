import React from 'react';
import $ from 'jquery';

class Modal extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        //this.props.onChange && this.props.onChange(e.target.checked);
    }

    componentDidMount(){
        this.$el = $(this.el);
        this.$el.modal({
            backdrop : false,
            show : this.props.isShow
        })
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
            <div ref={el => this.el = el} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 class="modal-title" >
                                模态框（Modal）标题
                            </h4>
                        </div>
                        <div className="modal-body">
                            在这里添加一些文本
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭
                            </button>
                            <button type="button" className="btn btn-primary">
                                提交更改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;