
import debug from 'debug';
import React from 'react';
let logger;

class Chosen extends React.Component {
    constructor(props){
        super(props);
        logger = debug("component:" + this.constructor.name);
        logger("initializing " + this.constructor.name + "ok!");

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.chosen({search_contains:true});//将包含查询字符串的的条目都列举出来，而不是仅从首字母开始
        this.$el.on('change', this.handleChange);
    }

    componentWillUnmount() {
        this.$el.off('change', this.handleChange);
        this.$el.chosen('destroy');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            //rely on custom event
            this.$el.trigger("chosen:updated");
        }
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div>
                <select className="Chosen-select" ref={el => this.el = el}>
                    {this.props.children}
                </select>
            </div>
        );
    }
}

export default Chosen;