export default (expenses) => {
    return expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0);
};
