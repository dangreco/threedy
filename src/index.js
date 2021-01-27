import React from 'react';
import ReactDOM from 'react-dom';
import NotConfigured from './Components/NotConfigured';
import ThreedyWrapper from './Components/ThreedyWrapper';

class ThreedyEditor extends HTMLElement {

    _config;

    setConfig(config) {
        this._config = config;
    }

    configChanged(newConfig) {
        const event = new Event("config-changed", {
            bubbles: true,
            composed: true
        });
        event.detail = { config: newConfig };
        this.dispatchEvent(event);
    }

    connectedCallback() {
        this._render();
    }

    render() {

    }

}

customElements.define('threedy-editor', ThreedyEditor);


class ThreedyCard extends HTMLElement {

    _hass;
    _config;


    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }


    _render() {
        if (this._hass === undefined || this._config === undefined)
            return ReactDOM.render(<NotConfigured />, this);

        ReactDOM.render(
            <ThreedyWrapper hass={this._hass} config={this._config} />,
            this
        );
    }

    set hass(hass) {
        this._hass = hass;
        this._render();
    }

    setConfig(config) {
        this._config = config;
        this._render();
    }

    getCardSize() {
        return 2;
    }

}

customElements.define('threedy-card', ThreedyCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: 'threedy-card',
    name: "Threedy Card",
    preview: false,
    description: "OctoPrint 3D Printer Card"
})