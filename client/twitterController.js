angular.module('app.twitter', [])
	.controller('twitterController', ['$scope', '$http', function($scope, $http) {
		$scope.tweets = null;
		$scope.filtered = null;
		$scope.getTweets = function(user){
			$scope.user = "";
			$scope.filtered = null;
			$scope.tweets = null;
			var url = '/q' + user;
			$http.get(url)
			.then(function(resp){
				$scope.tweets = resp.data;
				if(!$scope.tweets.length){
					alert('No user was found by that username, please try again.');
					$scope.user = "";
				}
			})
		};
		$scope.hashFilter = function(hashtag){
			var results = [];
			var tweets = $scope.tweets;
			for(var i = 0; i < tweets.length; i++){
				var hashtags = tweets[i].entities.hashtags;
				for(var j = 0; j < hashtags.length; j++){
					if(hashtags[j].text === hashtag){
						results.push(tweets[i]);
					}
				}
			}
			return $scope.filtered = results;
		};
	}])