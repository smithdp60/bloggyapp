bloggyApp.controller('NavCtrl', ['$scope', '$rootScope', '$modal', 'AlertService', 'UserService', function($scope, $rootScope, $modal, AlertService, UserService){

  console.log("NavCtrl loaded");

  $scope.UserService = UserService;

  $scope.showLogin = function() {
    $modal.open({
     templateUrl: '/views/auth/loginModal.html',
     controller: 'AuthLoginModalCtrl'
   })
  };

  $scope.logout = function() {
    UserService.logout(function(err, data) {

    })
  }

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  });

}])