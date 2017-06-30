
import debug from 'debug';
import React from 'react';
import $ from 'jquery';
//official : http://seiyria.com/bootstrap-slider/

class Slider extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(slideEvt){
        if (this.prevValue !== slideEvt.value){
            this.prevValue = slideEvt.value;
            console.log(slideEvt.value);
            if (typeof this.props.onChange === "function"){
                this.props.onChange(slideEvt.value);
            }
        }
    }

    componentDidMount(){
        this.$el = $(this.el);
        this.$el.slider();
        this.$el.on("slide" , this.handleChange);
    }

    componentWillUnmount(){
        this.$el.off("change" , this.handleChange);
        this.$el.slider("destroy");
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            //rely on jQuery's event namespacing to limit the scope to Select2 though by triggering the change.select2 event
            //this.$el.trigger("'change.select2'");
        }
    }

    render() {
        return (
            <input className="slider" ref={el => this.el = el}
                   data-slider-min={this.props.min} data-slider-max={this.props.max}
                   data-slider-step={this.props.step ? this.props.step : 1} data-slider-value={this.props.value}
            />
        );
    }
}

export default Slider;