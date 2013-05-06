var app = angular.module('App', ['ngSanitize']);

app.filter('expenseFilter', function($filter) {
    return function (expense, index) {

        var currencyFilter = $filter('currency');
        var amount = currencyFilter(expense.amount, "€");

        if(expense.operation === '=') {
            return '<span class="amount total">' + amount +'</span>';
        }

        if(expense.operation === '/=') {
            return '<span class="amount total-split">' + amount +'</span>';
        }

        if(expense.operation === '/') {
            return '<span class="amount">' + expense.amount +'</span>';
        }

        return '<span class="amount">' + amount + '</span> '
            + '<span class="description">' + expense.description + '</span>';
    }
});

function ExpensesCalculatorCtrl($scope) {

    $scope.expenses = [
//        {
//            operation: '+',
//            description: 'Cinema',
//            amount: 22.00
//        }
    ];

    $scope.total = 0;


    // http://rubular.com/r/lIcebOkzEa
    var regex = /([+|-|\/|\*|=])*\s*(\d*.\d*)\s*(.*)/;

    function calculateTotal() {
        var total = 0;
        var expense;
        var i;
        var len = $scope.expenses.length;

        for (i = 0; i < len; i++) {
            expense = $scope.expenses[i];
            if (expense.operation === '+' || expense.operation === '-') {
                total += expense.amount;
            }
            else if (expense.operation === '/') {
                total = total / expense.amount;
            }
        }

        return total;
    };

    $scope.addItem = function (item) {

        if (!item || item.trim === '') {
            return;
        }

        var match = item.match(regex);

        if (match[0] === '=') {
            $scope.expenses.push({
                operation: '=',
                amount: calculateTotal(),
                description: 'Total'
            })
            $scope.item = '';
            return;
        }

        if (match[1] === '/') {
            $scope.expenses.push({
                operation: '/',
                amount: match[2],
                description: 'Split'
            });
            $scope.expenses.push({
                operation: '/=',
                amount: calculateTotal(),
                description: 'Total'
            });
            $scope.item = '';
            return;
        }

        $scope.expenses.push({
            operation: match[1] || '+',
            amount: +match[2],
            description: match[3] || ''
        })

        $scope.item = '';
    }

    $scope.removeItem = function(index) {
        console.log(index);
        $scope.expenses.splice(index, 1);
    }


}