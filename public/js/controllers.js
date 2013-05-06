var app = angular.module('App', ['ngSanitize']);

app.filter('expenseFilter', function($filter) {
    return function (expense) {

        var currencyFilter = $filter('currency');
        var amount = currencyFilter(expense.amount, "€");

        if(expense.operation === '=') {
            return '<div class="total">' +
                '<span class="description">' + expense.description + '</span> '
                + '<span class="amount">' + amount + '</span>'
                + '</div>';
        }

        if(expense.operation === '/') {
            return '<div class="split">' +
                '<span class="description">' + expense.description + '</span> '
                + '<span class="amount">' + amount + '</span>'
                + '</div>';
        }

        return '<span class="description">' + expense.description + '</span> '
            + '<span class="amount">' + amount + '</span>';
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
                total = total / expense.split;
            }
        }

        return total;
    };

    $scope.addItem = function (item) {

        if (!item || item.trim === '') {
            return;
        }

        var match = item.match(regex);
        var len;


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
                split: match[2],
                description: 'Split by ' + match[2]
            });
            len = $scope.expenses.length - 1;
            $scope.expenses[len].amount = calculateTotal();
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