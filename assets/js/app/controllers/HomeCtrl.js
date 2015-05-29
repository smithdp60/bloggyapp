bloggyApp.controller('HomeCtrl', ['$scope', '$rootScope', 'Post', 'AlertService', function($scope, $rootScope, Post, AlertService){

  AlertService.clear();
  $rootScope.loading = true;

  console.log("HomeCtrl loaded");

  $scope.posts = [];

  $scope.createPost = function() {
    var post = new Post();
    post.title = "New title";
    post.body = "New body";
    post.$save(function(data) {
      console.log(data);
      // $scope.loadPosts();
    })
  }

  $scope.showPost = function(postId) {
    Post.get({id: postId}, function(data) {
      console.log(data);
    })
  }

  $scope.deletePost = function(postId) {
    Post.delete({id: postId}, function(data){
      AlertService.add('info', 'That post was deleted.')
      console.log(data);
    });
  }

  $scope.loadPosts = function() {
    io.socket.get('/api/post', function(data, jwRes){
      $scope.$evalAsync(function() {
        $rootScope.loading = false;
        $scope.posts = data;
      })
    })
  }

  $scope.loadPosts();

  io.socket.on('post', function(msg) {
    console.log('socket: ', msg);
    if (msg && msg.verb) {
      switch (msg.verb) {
        case 'created':
        $scope.$evalAsync(function() {
          $scope.posts.push(msg.data);
        })
        break;
        case 'updated':
        $scope.$evalAsync(function() {
          for (var i = 0; i < $scope.posts.length; i +=1) {
            if ($scope.posts[i].id == msg.id) {
              for (var key in msg.data) {
                $scope.posts[i][key] = msg.data[key];
              }
              break;
            }
          }
        })
        break;
        case 'destroyed':
        $scope.$evalAsync(function() {
          for (var i = 0; i < $scope.posts.length; i +=1) {
            if ($scope.posts[i].id == msg.id) {
              $scope.posts.splice(i,1);
              break;
            }
          }
        })
        break;
      }
    }
  });




  // $resource.get('/api/post').success(function(data){
  //   $scope.posts = data;
  // })


}])