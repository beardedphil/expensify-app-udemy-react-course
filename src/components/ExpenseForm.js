import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
        };
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        };
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    validateDateRange = (day) => {
        if (day.isBetween('2020-2-4', '2020-2-7')) {
            return true;
        }
        return false;
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Description and Amount are required fields.'}));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    };

    render() {
        return (
            <form
                className="form"
                onSubmit={ this.onSubmit }>
                { this.state.error && <p className="form__error">Error: { this.state.error }</p>}
                <input
                    type="text"
                    placeholder="Description"
                    autoFocus
                    className="text-input"
                    value={ this.state.description }
                    onChange={ this.onDescriptionChange }
                />
                <input
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={ this.state.amount }
                    onChange={ this.onAmountChange }
                />
                <SingleDatePicker
                    date={ this.state.createdAt }
                    onDateChange={ this.onDateChange }
                    focused={ this.state.calendarFocused }
                    onFocusChange={ this.onFocusChange }
                    numberOfMonths={1}
                    isOutsideRange={(day) => this.validateDateRange(day)}
                />
                <textarea
                    className="text-area"
                    placeholder="Add a note for your expense (optional)"
                    value={ this.state.note }
                    onChange={ this.onNoteChange }
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
}