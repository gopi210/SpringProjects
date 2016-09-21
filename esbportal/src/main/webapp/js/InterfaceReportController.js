GenuinePartsesbPortal.myApp.controller("ReportController",["$scope","$http","myService",
function($scope,$http,myService) {
	var url='/esbportal/InterfaceReport/Gopi';
	var reqdata = {
			  "UIRequest":{
				    "user":"1",
				    "remoteIP":"1",
				    "corelationID":"123456",
				    "content":{
				      "intSummary":{
				        "activeDeactiveAsset":{
				         "range":"1h",
						 "appID":"APG"
				        }
				      }
				    }
				  }
				};
	myService.InvokeDataService(reqdata,url).then(function(intReportResp) {
		console.log(intReportResp.result.success);
		
		if(intReportResp.result.success == "true") 
			{
			$scope.intSummary=intReportResp.content.transSummary.serviceLevel;	  	  
			}
		else
			{
			alert('Failed');
			} 
});
}]);