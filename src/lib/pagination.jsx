import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

//props参考如下插件:
//https://github.com/esimakin/twbs-pagination/blob/master/jquery.twbsPagination.js

class Pagination extends React.Component {
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
        let {totalPages , currentPage , visiblePages } = this.props;
        let pageNumberList = [];
        for (let i = 1 ; i <= totalPages;i++){
            pageNumberList.push(i);
        }
        return (
            <ul className="pagination">
                <li><a href="#">&laquo;</a></li>
                {
                    pageNumberList.map((idx) => {
                        return (
                            <li key={idx}><a href="#">{idx}</a></li>
                        )
                    })
                }
                <li><a href="#">&raquo;</a></li>
            </ul>
        );
    }
}

Pagination.propTypes = {
    totalPages : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    visiblePages : PropTypes.number
};

Pagination.defaultProps = {
    currentPage : 1,
    totalPages : 1,
    visiblePages : 7    //默认7页，最好单数
};

export default Pagination;
