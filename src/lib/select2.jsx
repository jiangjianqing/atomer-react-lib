
import debug from 'debug';
import React from 'react';
import $ from 'jquery';
let logger;

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
        this.$el.select2();
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
            <div>
                <select ref={el => this.el = el}>
                    {this.props.children}
                </select>
            </div>
        );
    }
}

export default Select;