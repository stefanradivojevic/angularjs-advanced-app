'use strict';

angular
	.module('angularJSApp')
	.factory('getDataService', function($http) {
		
		var factory = {};

		factory.getUsers = function() {
				var usersColumns = [{name: 'id', title: 'no.', width: 2},
                    	            {name: 'first_name', title: 'Name', width: 3},
                        	        {name: 'last_name', title: 'Last name', width: 4},
                            	    {name: 'email', title: 'Email', width: 3}
                            	];

		    	var promise = $http.get('dbMockup/users.json').then(function (response) {

		        	return {
		        		columns: usersColumns,
		        		rows: response.data,
		        		tableTitle: 'List of Users'
		        	}
		      	});

		      return promise;
	    }

		factory.getCars = function() {
				var carsColumns = [ {name: 'id', title: 'no.', width: 2},
                    	            {name: 'car', title: 'Car', width: 3},
                        	        {name: 'payment_method', title: 'Payment method', width: 3},
                            	    {name: 'currency', title: 'Currency', width: 1},
                                	{name: 'city', title: 'City', width: 3}
                            	];

		    	var promise = $http.get('dbMockup/car_purchases.json').then(function (response) {

		        	return {
		        		columns: carsColumns,
		        		rows: response.data,
		        		tableTitle: 'Cars Purchases'
		        	}
		      	});

		      return promise;
	    }

	    // Helper function
        function parseDate(dateItem) {
            var parts = dateItem.split('/'),
            	date = new Date(parseInt(parts[2]), 
                                parseInt(parts[0]), 
                                parseInt(parts[1]));
            return date;
        };

		factory.getFiles = function() {
				var filesColumns = [{name: 'id', title: 'no.', width: 2},
	                                {name: 'username', title: 'Username.', width: 3},
	                                {name: 'filename', title: 'File name', width: 4},
	                                {name: 'uploadDate', title: 'Time of upload', reverseSort: true, width: 3}
		                        ];

		    	var promise = $http.get('dbMockup/uploads.json').then(function (response) {
		    		// Changing date format to be used in angularjs orderby
                    for (var index in response.data) {
                        var file = response.data[index];
                        file.uploadDate = parseDate(file.datetime.date);
	    			}

		        	return {
		        		columns: filesColumns,
		        		rows: response.data,
		        		tableTitle: 'File Uploads'
		        	}
		      	});

		      	return promise;
	    }

		  return factory;
	});