angular.module('MainCtrl', [])
  .controller('MainController', function($scope, $http, $state) {

      $scope.testCheck = "in advertisementId";

      /*
       |-----------------------------------------------------------
       | User activity tracking function
       |-----------------------------------------------------------
      */
      $scope.userLogs = function(clickEvent){
        $http({
          method : "POST",
          url : '/api/userLogs',
          data : {
            "clickEvent": clickEvent
          }
        }).success(function(data) {
          console.log("success userLogs");
          console.log(data);
        }).error(function(error) {
          console.log("Error posting data in user logs");
        });
      };


      //update angular cart from session everytime
        $http({
          method : "POST",
          url : '/api/shoppingCart'
        }).success(function(data) {
          console.log("success get all cart from session");
          console.log(data);
          $scope.shoppingCart = data;
        }).error(function(error) {
          console.log("Error retrieving all ads data");
        });


      var testing = '';
      //get all allAdvertisement for selling
      $http({
        method : "POST",
        url : '/'
      }).success(function(data) {
        console.log("success get selling advertisement");
        console.log(data);
        if(data){
          $scope.allSellingAdvertisement = data;
        }
      }).error(function(error) {
        console.log("Error posting data in currentUser");
      });

      //remove row from shoppingCart
      $scope.removeRow = function(adId) {
        console.log("in removeRow");
        $http({
          method : "POST",
          url : '/api/removeFromCart',
          data : {
            "adId" : adId
          }
        }).success(function(data) {
          console.log("in removeRow success");
          window.location.reload();
        }).error(function(error) {
          console.log("Error posting data");
        });
      };

      //on checkout
      $scope.checkout = function(quantityEntered){
        console.log("--------checkout------");
        $http({
          method : "POST",
          url : '/api/checkout'
        }).success(function(data) {
          console.log("in checkout success");
          $state.go('profile.itemsPurchased');
        }).error(function(error) {
          console.log("Error posting data");
        });
      };


});
