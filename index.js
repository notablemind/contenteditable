
/**
 * This was taken from the angular docs
 * http://docs.angularjs.org/api/ng.directive:ngModel.NgModelController
 */

var angular = require('angularjs');

module.exports = angular.module('contenteditable', [])
  .directive('contenteditable', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.bind('blur keyup change', function() {
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          ngModel.$setViewValue(element.html());
        }
      }
    };
  });

