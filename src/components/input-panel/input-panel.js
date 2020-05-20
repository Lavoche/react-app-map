import React, { Component } from 'react';
import './input-panel.css';

export default class InputPanel extends Component {

    state = {
        label:''
    }

    onLabelChange = (e) => {
        this.setState({
            label:e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onMarkerAdd(this.state.label);
        this.setState({label:''})
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="d-flex">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите наименование пункта"
                    onChange={this.onLabelChange}
                    value={this.state.label}
                />
                <button className="btn btn-outline-success add-marker">
                    Добавить
                </button>
            </form>
        );
    }
}