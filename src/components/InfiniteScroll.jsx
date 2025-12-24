import React from 'react';
import $ from 'jquery-slim';

class InfiniteScroll extends React.Component {
    static defaultProps = {
        el: window,
        end: false,
        fetching: false
    };

    constructor(props) {
        super(props);
        this.timer = this.winHei = this.offsetPercent = 0;
        this.removeFooterHeight = props.el !== window ? false : true;
    }

    componentDidMount() {
        const { el } = this.props;
        this.timer = setTimeout(() => {
            this.resizeWindow();
            this.loadOnScroll();
            $(window).on('resize', this.resizeWindow);
            $(el).on('scroll', this.loadOnScroll);
        }, 100)
    }

    componentDidUpdate(prevProps) {
        const { el, list } = this.props;
        if (el !== prevProps.el) {
            $(prevProps.el).off('scroll', this.loadOnScroll);
            this.resizeWindow();
            $(el).on('scroll', this.loadOnScroll);
        }
        else if (list.length !== prevProps.list.length) {
            this.loadOnScroll();
        }
    }

    componentWillUnmount() {
        const { el } = this.props;
        $(window).off('resize', this.resizeWindow);
        $(el).off('scroll', this.loadOnScroll);
        clearTimeout(this.timer);
    }

    render() {
        return null;
    }

    loadOnScroll = () => {
        const { end = false, fetching = false } = this.props;
        if (end === false && fetching === false && this.crossedScrollThreshold()) {
            this.props.onLoadMore();
        }
    }

    resizeWindow = () => {
        const { el } = this.props;
        const element = el === window ? document.documentElement : document.querySelector(el);
        this.winHei = el === window ? $(window).height() : $(element).outerHeight(true);
        this.offsetPercent = Math.round(this.winHei * 0.5);
        if (this.removeFooterHeight === true && $("#footer").length > 0) {
            this.offsetPercent += $("#footer").outerHeight(true);
        }
    }

    crossedScrollThreshold = () => {
        const { el } = this.props;
        const element = el === window ? document.documentElement : document.querySelector(el);
        let st = el === window ? el.pageYOffset + this.offsetPercent : $(element).scrollTop();
        let sh = (el === window ? document.documentElement.scrollHeight : element.scrollHeight) - this.winHei;
        return st >= sh;
    }
}

export default InfiniteScroll;