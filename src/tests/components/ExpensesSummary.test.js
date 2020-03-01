import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';


test('should render correctly with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={ 1 } expensesTotal={ 235 } />);
    expect(wrapper).toMatchSnapshot();
});

test('should render correctly with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={ 3 } expensesTotal={ 235 } />);
    expect(wrapper).toMatchSnapshot();
});