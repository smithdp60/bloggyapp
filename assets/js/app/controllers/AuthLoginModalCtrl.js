bloggyApp.controller('AuthLoginModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'AlertService', 'UserService', function($scope, $rootScope, $modalInstance, AlertService, UserService){

  $scope.login = function() {
    UserService.login($scope.email, $scope.password, function(err, data){
      if (err) {
        console.log(err);
        alert('Something bad happened');
      } else if (data && data.result) {
        $modalInstance.close();
      } else {
        console.log(data);
        alert('Unable to login');
      }
    })
  }

}])