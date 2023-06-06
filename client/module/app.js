var app = angular.module("myApp", ["ngRoute"]);

const apiUrl = "http://localhost:5000";

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "components/home.html",
        controller: "homeCtrl",
      })
      .when("/login", {
        templateUrl: "components/login.html",
        controller: "loginCtrl",
      })
      .when("/signup", {
        templateUrl: "components/signup.html",
        controller: "signupCtrl",
      })
      .when("/hotel", {
        templateUrl: "components/hotel.html",
        controller: "hotelCtrl",
      })
      .otherwise({
        redirectTo: "index.html",
      });
  },
]);

app.run(function ($rootScope) {
  $rootScope.auth = {
    isAuth: false,
    user: null,
    id: null,
  };

  $rootScope.hotels = [];
  $rootScope.hotelById = [];

  $rootScope.check_in = new Date();
  $rootScope.check_out = new Date();

  $rootScope.logout = function () {
    $rootScope.auth.isAuth = false;
  }
});

// Home controller
app.controller("homeCtrl", function ($scope, $http, $rootScope) {
  $http.get(`${apiUrl}/getHotels`).then(function (res) {
    $scope.hotelsData = res.data.hotels;
    $rootScope.hotels = $scope.hotelsData;
  });
  $scope.hotelInfo = function (id) {
    $rootScope.hotelById = $scope.hotelsData.find((ele) => ele._id === id);
  };

  $scope.check_in = new Date();
  $scope.check_out = new Date();

  $scope.changeDate = function () {
    $rootScope.check_in = $scope.check_in;
    $rootScope.check_out = $scope.check_out;
  };
});

//hotel controller
app.controller("hotelCtrl", function ($scope, $http, $rootScope, $location) {
  $scope.hotel = $rootScope.hotelById;
  $scope.rooms = 1;

  $scope.check_in = $rootScope.check_in;
  $scope.check_out = $rootScope.check_out;
  $scope.changeDate = function () {
    $rootScope.check_in = $scope.check_in;
    $rootScope.check_out = $scope.check_out;
  };

  $scope.BookHotel = function () {
    let data = {
      hotel_Id: $scope.hotel._id,
      user_Id: $rootScope.auth.id,
      check_in: $rootScope.check_in,
      check_out: $rootScope.check_out,
      rooms: $scope.rooms,
      price: $scope.hotel.hprice * $scope.rooms,
    };
    console.log(data);

    if ($rootScope.auth.isAuth === false) {
      $location.path("/login");
    } else {
      $http.post(`${apiUrl}/bookhotel`, JSON.stringify(data)).then(
        function (res) {
          if (res.data) {
            console.log(res.data);
            alert("Book Successfully");
            $location.path("/");
          }
        },
        function (res) {
          $scope.signup_err = res.data.error;
        }
      );
    }
  };
});

//Signup Controller
app.controller("signupCtrl", function ($scope, $http, $location, $rootScope) {
  $scope.name = "";
  $scope.email = "";
  $scope.phone = "";
  $scope.password = "";
  $scope.cpassword = "";
  $scope.signup_err = "";

  $scope.sendSignUpReq = function () {
    let data = {
      email: $scope.email,
      name: $scope.name,
      phone: $scope.phone,
      password: $scope.password,
      cpassword: $scope.cpassword,
    };
    $http.post(`${apiUrl}/register`, JSON.stringify(data)).then(
      function (res) {
        if (res.data) {
          $location.path("/login");
        }
      },
      function (res) {
        $scope.signup_err = res.data.error;
      }
    );
  };
});

//Login Controller
app.controller("loginCtrl", function ($scope, $http, $location, $rootScope) {
  $scope.email = "";
  $scope.password = "";
  $scope.login_err = "";

  $scope.sendLoginReq = function () {
    let data = {
      email: $scope.email,
      password: $scope.password,
    };
    $http.post(`${apiUrl}/login`, JSON.stringify(data)).then(
      function (res) {
        if (res.data) {
          $rootScope.auth.user = res.data.userLogin.name;
          $rootScope.auth.id = res.data.userLogin._id;
          $rootScope.auth.isAuth = true;
          $location.path("/");
        }
      },
      function (res) {
        $scope.login_err = res.data.error;
        alert($scope.login_err);
      }
    );
  };
});
