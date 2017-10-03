(function() {
    'use strict';

    angular.module('angularJSApp', ['angularMoment', 'ngAnimate', 'ui.bootstrap'])

    .controller('ngController', ['$scope', 'getDataService', function($scope, getDataService) {
        // Call service to get data
        getDataService.getUsers().then(function(res) {
            $scope.users = res;
        });

        getDataService.getCars().then(function(res) {
            $scope.cars = res;
        });

        getDataService.getFiles().then(function(res) {
            $scope.files = res;
        });
    }])

    .directive('tcTable', ['getDataService', function(getDataService) {
        return {
            templateUrl: 'templates/tc-data-table.html',
            restrict: 'A',
            replace: true,
            scope: { columns: '=', rows: '=', tableTitle: '=' },
            link: function(scope, element, attrs) {
                    // Ordering
                    scope.setOrderColumn = function(col) {
                        if (scope.sortColumn === col.name) {
                            scope.sortReverse = !scope.sortReverse;
                        } else {
                            scope.sortColumn = col.name;
                            scope.sortReverse = col.reverseSort;
                        }
                    }
                    
                    // Pagination
                    scope.currentPage = 1;
                    scope.numPerPage = 10;
                    scope.maxSize = 5;

                    // On search start set pagination to first page
                    scope.setFirstPage = function() {
                        scope.currentPage = 1;
                    }
            }
        };
    }])

    .filter('pagination', function() {
        return function(input, currentPage, pageSize) {
            if (angular.isArray(input)) {
                let start = (currentPage - 1) * pageSize,
                    end = currentPage * pageSize;

                return input.slice(start, end);
            }
        };
    })

    .filter('searchcolumns', function() {
        return function(input, columns) {
            function checkRow(row, columns) {
                for (var index in columns) {
                    let col = columns[index];

                    if (row && row[col.name] && col.searchText) {
                        let content = row[col.name].toString().toLowerCase();
                        if (content.indexOf(col.searchText.toLowerCase()) == -1) {

                            return false;
                        }
                    } 
                }

                return true; 
            }
            if (angular.isArray(input)) {
                var arr = [];
                for (var i = 0; i <= input.length; i++) {
                    if (checkRow(input[i], columns)) {
                        arr.push(input[i]);
                    }
                }

                return arr;
            }
        };
    })


})();
