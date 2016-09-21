GenuinePartsesbPortal.myApp.controller("LogExceptionController",["$scope","$http","myService",'uiGridConstants',
function($scope,$http,myService,uiGridConstants) {
	$scope.gridOptions = [];

    //Pagination
    $scope.pagination = {
        paginationPageSizes: [15, 25, 50, 75, 100, "All"],
        ddlpageSize: 15,
        pageNumber: 1,
        pageSize: 15,
        totalItems: 0,

        getTotalPages: function () {
            return Math.ceil(this.totalItems / this.pageSize);
        },
        pageSizeChange: function () {
            if (this.ddlpageSize == "All")
                this.pageSize = $scope.pagination.totalItems;
            else
                this.pageSize = this.ddlpageSize

            this.pageNumber = 1
            $scope.GetLogsExceptions();
        },
        firstPage: function () {
            if (this.pageNumber > 1) {
                this.pageNumber = 1
                $scope.GetLogsExceptions();
            }
        },
        nextPage: function () {
            if (this.pageNumber < this.getTotalPages()) {
                this.pageNumber++;
                $scope.GetLogsExceptions();
            }
        },
        previousPage: function () {
            if (this.pageNumber > 1) {
                this.pageNumber--;
                $scope.GetLogsExceptions();
            }
        },
        lastPage: function () {
            if (this.pageNumber >= 1) {
                this.pageNumber = this.getTotalPages();
                $scope.GetLogsExceptions();
            }
        }
    };
    $scope.cantPageBackward = function() {
    	if(pageNumber == 1){
    		$scope.cantGoBack=true;
    	}
    }

    //ui-Grid Call
    $scope.GetLogsExceptions = function () {
        $scope.loaderMore = true;
        $scope.lblMessage = 'loading please wait....!';
        $scope.result = "color-green";

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };
        $scope.gridOptions = {
            useExternalPagination: true,
            useExternalSorting: true,
            enableFiltering: true,
            enableSorting: true,
            enableRowSelection: true,
            enableSelectAll: true,
            enableGridMenu: true,

            columnDefs: [
                { name: "ApplicationID", displayName: "APPID", width: '10%', headerCellClass: $scope.highlightFilteredHeader },
                { name: "InterfaceID", title: "Interface", width: '40%', headerCellClass: $scope.highlightFilteredHeader },
                { name: "TransactionType", title: "Type", headerCellClass: $scope.highlightFilteredHeader },
                {
                    name: "Price", title: "Price", cellFilter: 'number',
                    filters: [{ condition: uiGridConstants.filter.GREATER_THAN, placeholder: 'Minimum' }, { condition: uiGridConstants.filter.LESS_THAN, placeholder: 'Maximum' }],
                    headerCellClass: $scope.highlightFilteredHeader
                },
                { name: "CreatedOn", displayName: "Created On", cellFilter: 'date:"short"', headerCellClass: $scope.highlightFilteredHeader },
                {
                    name: 'Edit',
                    enableFiltering: false,
                    enableSorting: false,
                    width: '5%',
                    enableColumnResizing: false,
                    cellTemplate: '<span class="label label-warning label-mini">' +
                                  '<a href="" style="color:white" title="Select" ng-click="grid.appScope.GetByID(row.entity)">' +
                                    '<i class="fa fa-check-square" aria-hidden="true"></i>' +
                                  '</a>' +
                                  '</span>'
                }
            ],
            exporterAllDataFn: function () {
                return getPage(1, $scope.gridOptions.totalItems, paginationOptions.sort)
                .then(function () {
                    $scope.gridOptions.useExternalPagination = false;
                    $scope.gridOptions.useExternalSorting = false;
                    getPage = null;
                });
            },
        };

        var NextPage = (($scope.pagination.pageNumber - 1) * $scope.pagination.pageSize);
        var NextPageSize = $scope.pagination.pageSize;
        var apiRoute = 'api/Product/GetProducts/' + NextPage + '/' + NextPageSize;
        var result = CRUDService.getProducts(apiRoute);
        result.then(
            function (response) {
                $scope.pagination.totalItems = response.data.recordsTotal;
                $scope.gridOptions.data = response.data.productList;
                $scope.loaderMore = false;
            },
        function (error) {
            console.log("Error: " + error);
        });
    }

    //Default Load
    $scope.GetLogsExceptions();

    //Selected Call
    $scope.GetByID = function (model) {
        $scope.SelectedRow = model;
    };
}
]);