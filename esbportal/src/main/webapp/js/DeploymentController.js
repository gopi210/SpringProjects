//var url='/esbportal/DeploymentAccelarator';

GenuinePartsesbPortal.myApp.controller("DeployController",["$scope","$http","myService","toastr","$anchorScroll",
function($scope,$http,myService,toastr,$anchorScroll) {
	var url='/esbportal/DeploymentAccelarator';
	var archiveLoc=null;
	var SelectedEnv=null;
	$scope.Envnames = [{Name:"APGQA",Value:"APG_QA_01"}, {Name:"APGQA2",Value:"APG_QA_02"}];
$scope.GenArtifacts = function(earpath){
	if(earpath){
		$scope.loading=true;
		$scope.disArcPath=true;
		archiveLoc=earpath;
	var reqdata = {
			  "UIRequest":{
				    "user":"1",
				    "remoteIP":"1",
				    "corelationID":"123456",
				    "operationName":"ExtractGvs",
				    "content":{
				      "DeploymentAccelarator":{
				        "ExtractProperties":{				         
						 "archivePath":earpath
				        }
				      }
				    }
				  }
				};    
    myService.InvokeDataService(reqdata,url).then(function(ExtractGVResponse) {
		console.log(ExtractGVResponse.UIResponse.result.isSuccess);
		
		if(ExtractGVResponse.UIResponse.result.isSuccess) 
			{
			$scope.ArchiveVariables=ExtractGVResponse.UIResponse.content.extractProps.ArchiveProps;
			$scope.loading=false;
			$scope.CallInp=true;
			 $('.panel-heading span.clickable').click();
			$('#myTabs a:first').tab('show');
			toastr.success('Extracted Gvs');
			}
		else
			{
			$scope.loading=false;
			 toastr.error('Failed to extract Gvs');
			} 
});
  }
}
$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
})
$scope.EnvChange = function(EnvName){
	if(EnvName){
		SelectedEnv=EnvName.Value;
	}	
}
$('#SaveGVs').on('click', function (e) {
	$scope.CallInp=true;
	alert(SelectedEnv);
	if(SelectedEnv){
    var reqdata = {
			  "UIRequest":{
				    "user":"1",
				    "remoteIP":"1",
				    "corelationID":"123456",
				    "operationName":"UpdateGvs",
				    "content":{
				    	"DeploymentAccelarator":{
				    		"UpdateProps":{
				    			"Path":archiveLoc,
				    			"Env":SelectedEnv,
				    			"items":$scope.ArchiveVariables
				    		}
				    	}
				      }
				  }
				};
		myService.InvokeDataService(reqdata,url).then(function(ExtractGVResponse) {
		//console.log(ExtractGVResponse.UIResponse.result.isSuccess);
		
		if(ExtractGVResponse.UIResponse.result.isSuccess) 
			{			
			$scope.ArchiveVariables=ExtractGVResponse.UIResponse.content.updateProps.items;
			if($scope.ArchiveVariables.length >0){				
			$scope.isGvsUpdated=true;
			 $('.panel-heading span.clickable').click();
			$('#myTabs a:first').tab('show');
			$anchorScroll();
			toastr.success('GVs are Updated!');
			$('#ValidationTabs a:first').tab('show');
			}
			}
		else
			{
			toastr.error('Error updating GVs!');		
			} 
	
});
}
})  
}]);