import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt,
    },
});

const removeExpense  = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates,
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
});

const sortByAmount = () => ({
   type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date,
});

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date,
});

const expensesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense,
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => action.id !== id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates,
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text,
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount',
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date',
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date,
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date,
            };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate != 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate != 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const rentExpense = store.dispatch(addExpense({ description: 'Rent', amount: 54500, createdAt: 1000 }));
const groceryExpense = store.dispatch(addExpense({ description: 'Groceries', amount: 8719, createdAt: -1000 }));
const qdExpense = store.dispatch(addExpense({ description: 'QD', amount: 21650, createdAt: 5000 }));

// store.dispatch(removeExpense({ id: qdExpense.expense.id }));
// store.dispatch(editExpense(groceryExpense.expense.id, { amount: 3719 }));

// store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter());
//
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setEndDate(521));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

const demoState = {
  expenses: [{
      id: '12',
      description: 'January Rent',
      notes: 'Paid on time, for once.',
      amount: 54500,
      createdAt: 0,
  }],
  filters: {
      text: 'rent',
      sortBy: 'amount', // date or amount
      startDate: undefined,
      endDate: undefined,
  },
};
