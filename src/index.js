import React from 'react';
import ReactDOM from 'react-dom';
import NotConfigured from './Components/NotConfigured/NotConfigured';
import ThreedyWrapper from './Components/ThreedyWrapper/ThreedyWrapper';

class ThreedyCard extends HTMLElement {

    _hass;
    _config;


    connectedCallback()
    {
        this._render();
    }

    disconnectedCallback()
    {
        ReactDOM.unmountComponentAtNode(this);
    }


    _render()
    {
        if (this._hass === undefined || this._config === undefined)
            return ReactDOM.render( <NotConfigured />, this );

        ReactDOM.render(
            <ThreedyWrapper hass={this._hass} config={this._config} />,
            this
        );
    }

    set hass(hass)
    {
        this._hass = hass;
        this._render();
    }

    setConfig(config)
    {
        this._config = config;
        this._render();
    }

    getCardSize()
    {
        return 2;
    }

}

customElements.define('threedy-card', ThreedyCard);