import React from 'react';
import ReactDOM from 'react-dom';
import NotConfigured from './Components/NotConfigured';
import ThreedyWrapper from './Components/ThreedyWrapper';
import Configurator from './Configurator';

class ThreedyEditor extends HTMLElement {

    _hass;
    _config;

    set hass(hass)
    {
        this._hass = hass;
        this._render();
    }

    setConfig(config) {
        this._config = config;
        this._render();
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

    _render() 
    {   
        if (!this._hass)
            return

        ReactDOM.render(
            <Configurator hass={this._hass} config={this._config} />,
            this
        );
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
        if (!this._hass || !this._config || !this._hass.states)
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


    static getConfigElement()
    {
        return document.createElement('threedy-editor');
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