angular.module('filtersApp', [])
  .controller('FilterCtrl', [function(){
    this.startTime = new Date().getTime();
    this.someTimeAgo = new Date().getTime() - (1000 * 60 * 60 * 4);
  }])
  .filter('timeAgo', [function() {
    var ONE_MINUTE = 1000 * 60;
    var ONE_HOUR = ONE_MINUTE * 60;
    var ONE_DAY = ONE_HOUR * 24;
    var ONE_MONTH = ONE_DAY * 30;

    return function(timestamp, optShowSeconds) {
      if (optShowSeconds !== false) {
        optShowSeconds = true;
      }
      var currentTime = new Date().getTime();
      var diff = currentTime - timestamp;
      if (diff < ONE_MINUTE && optShowSeconds) {
        return 'seconds ago';
      } else if (diff < ONE_HOUR) {
        return 'minutes ago';
      } else if (diff < ONE_DAY) {
        return 'hours ago';
      } else if (diff < ONE_MONTH) {
        return 'weeks ago';
      }
      return 'months ago';
    };
  }]);
