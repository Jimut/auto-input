const AutoInput = () => ({
  restrict: 'EA',
  require: 'ngModel',
  scope: {
    values: '=',
    key: '=ngModel',
    placeholder: '@',
    focus: '&ngFocus',
    blur: '&ngBlur',
  },
  link($scope, $elm, $attr, $ctrl) {
    const search = (v) => {
      const index = v.search(new RegExp($scope.key, 'i'));

      if (index === 0) {
        return true;
      }

      return false;
    };

    const filterValues = () => {
      $scope.filteredValues = $scope.values.filter(search);
    };

    const resetKey = () => {
      $scope.key = '';
    };

    $scope.selectAsKey = (value) => {
      $scope.key = value;
      $scope.displayList = false;
    };

    $scope.inputOnFocus = ($event) => {
      $scope.displayList = true;
      $scope.focus($event);
    };

    $scope.inputOnBlur = ($event) => {
      $scope.displayList = false;
      $scope.blur($event);
    };

    $scope.showSearchList = () => {
      if (!$scope.displayList) {
        return false;
      }

      if ($scope.filteredValues.length < 1) {
        return false;
      }

      return true;
    };

    $scope.$watch('key', filterValues);

    $scope.$watch('values', () => {
      filterValues();
      resetKey();
    });

    // eslint-disable-next-line no-param-reassign
    $ctrl.$validators.presentInList = (modelValue) => {
      if ($ctrl.$isEmpty(modelValue)) {
        return true;
      }

      if ($scope.values.find(v => v.toLowerCase() === modelValue.toLowerCase())) {
        return true;
      }

      return false;
    };
  },
  template:
    '<div class="auto-input">' +
      '<input type="text" name="keyInput" placeholder="{{ placeholder }}" ng-model="key" ng-focus="inputOnFocus($event)" ng-blur="inputOnBlur($event)">' +
      '<ul class="auto-input__list" ng-if="showSearchList()">' +
        '<li class="auto-input__list-item" ng-repeat="value in filteredValues" ng-mousedown="selectAsKey(value)" ng-bind="value"></li>' +
      '</ul>' +
    '</div>',
});

export default AutoInput;
