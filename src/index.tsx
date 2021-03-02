import React from 'react';
import ReactDOM from 'react-dom';
import NotConfigured from './Components/NotConfigured';
import ThreedyWrapper from "./Components/ThreedyWrapper";
import Configurator from './Configurator';
import {HomeAssistant, ThreedyConfig} from "./types";

class ThreedyEditor extends HTMLElement {

    _hass: HomeAssistant | undefined;
    _config: ThreedyConfig | undefined;

    constructor()
    {
        super();
    }

    set hass(hass) {
        this._hass = hass;
        this._render();
    }

    setConfig(config) {
        this._config = config;
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        if (!this._hass)
            return

        ReactDOM.render(
            <Configurator hass={this._hass} config={this._config} threedy={this} />,
            this
        );
    }

}

customElements.define('threedy-editor', ThreedyEditor);


class ThreedyCard extends HTMLElement {

    _hass: HomeAssistant | undefined;
    _config: ThreedyConfig | undefined;


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


    static getConfigElement() {
        return document.createElement('threedy-editor');
    }


}

customElements.define('threedy-card', ThreedyCard);


// @ts-ignore
window.customCards = window.customCards || [];
// @ts-ignore
window.customCards.push({
    type: 'threedy-card',
    name: "Threedy Card",
    preview: false,
    description: "OctoPrint 3D Printer Card"
})
