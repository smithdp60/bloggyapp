bloggyApp.directive('alerts', function(){

  return {
    restrict: 'E',
    scope: {},
    controller: ['$scope', 'AlertService', function($scope, AlertService) {

      $scope.getAlerts = function() {
        return AlertService.get();
      }

      $scope.closeAlert = function(index) {
        AlertService.remove(index);
      };

    }],
    replace: true,
    template: '<alert ng-repeat="alert in getAlerts()" type="{{alert.type}}" close="$parent.closeAlert($index)">{{alert.text}}</alert>'
  }


})