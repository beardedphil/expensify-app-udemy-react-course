import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';


let startEditExpenseSpy, startRemoveExpenseSpy, historySpy, wrapper;

beforeEach(() => {
    startEditExpenseSpy = jest.fn();
    startRemoveExpenseSpy = jest.fn();
    historySpy = { push: jest.fn() };
    wrapper = shallow(
        <EditExpensePage
            expense={ expenses[0] }
            startEditExpense={ startEditExpenseSpy }
            startRemoveExpense={ startRemoveExpenseSpy }
            history={ historySpy }
        />
    );
});

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
});

test('should handle start remove expense', () => {
    wrapper.find('button').simulate('click');
    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({
        "id": expenses[0].id
    });
    expect(historySpy.push).toHaveBeenLastCalledWith('/');
});