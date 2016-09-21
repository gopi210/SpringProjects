GenuinePartsesbPortal.myApp.factory(
		'myService',
		[		 
		 '$http',
		 '$q',
function($http,$q) {
			 return {
				 InvokeDataService: function(ReportReq,url){
					 var defered = $q.defer();
					 var reqdata = ReportReq;
		   	         var httpRequest = {
							method : 'POST',
							url : url,
							headers : {
								'Content-Type' : 'application/json'
							},
							data : reqdata						
						};
		   	      $http(httpRequest).success(function(data, status, headers, config) {
		   	    	defered.resolve(data);
		   	    	loading=false;
					 }).error(function (data, status, headers, config){						 
						 defered.reject(data);
						 loading=false;
					 });
		   	   return defered.promise;
				 }
			 }			

		 }]);