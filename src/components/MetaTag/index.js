import React from 'react';
import { get } from 'lodash';
import $ from 'jquery-slim';
import { words } from '../../utils/constants';

const generateUrl = () => {};
const appendBaseUrl = () => {};

export default class MetaTag extends React.Component {
    _title = "";
    _description = "";

    componentDidMount() {
        this.setupMeta();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setupMeta();
        }
    }

    setupMeta = () => {
        let {
            title = "",
            description = "",
            og_image = {},
            keywords = "",
        } = this.props;


        if (!title) {
            title = this._title;
        }

        if (!description) {
            description = this._description;
        }

        if (!og_image) {
            og_image = {};
        }
        if (get(og_image, 'name')) {
            og_image['file_path'] = generateUrl(og_image);
        }

        const oldDocumentTitle = document.title;
        document.title = title + " | " + words.appName;
        this.setMeta("description", description);
        this.setMeta("keywords", keywords);
        this.setShareMeta("og:url", window.location.pathname, true);
        this.setShareMeta("twitter:url", window.location.pathname, true);
        this.setShareMeta("og:title", title);
        this.setShareMeta("twitter:title", title);
        this.setShareMeta("og:description", description);
        this.setShareMeta("twitter:description", description);
        this.setShareMeta("og:image", get(og_image, 'file_path'));
        this.setShareMeta("twitter:image", get(og_image, 'file_path'));
        this.setShareMeta("description", description);
        $('link[rel="canonical"]').attr("href", window.location.href);

        if (oldDocumentTitle !== title) {
            //Tracking Script
        }
    }

    setMeta = (name, content) => {
        $('meta[name="' + name + '"]').attr("content", content);
    }

    setShareMeta = (name, content, addprefix) => {
        let prefix = appendBaseUrl();
        $('meta[property="' + name + '"]').attr("content", addprefix === true ? prefix + content : content);
    }

    render() {
        return null;
    };
};