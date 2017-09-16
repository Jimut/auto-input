const data = [
  {
    team: 'Engineering',
    employees: ['Lawana Fan', 'Larry Rainer', 'Rahul Malik', 'Leah Shumway'],
  },
  {
    team: 'Executive',
    employees: ['Rohan Gupta', 'Ronda Dean', 'Robby Maharaj'],
  },
  {
    team: 'Finance',
    employees: ['Caleb Brown', 'Carol Smithson', 'Carl Sorensen'],
  },
  {
    team: 'Sales',
    employees: ['Ankit Jain', 'Anjali Maulingkar'],
  },
];

const AppCtrl = ($scope) => {
  $scope.formData = {
    sendEmail: false,
    team: '',
    employee: '',
  };

  $scope.teams = data.map(v => v.team);
  $scope.employees = [];

  const filterEmployees = () => {
    const group = data.find(g => g.team.toLowerCase() === $scope.formData.team.toLowerCase());

    if (!group) {
      $scope.employees = [];
      return;
    }

    $scope.employees = group.employees;
  };

  $scope.teamOnBlur = (form) => {
    filterEmployees();
    setTimeout(() => {
      form.employee.$validate();
    });
  };

  $scope.isValid = (form) => {
    if (form.$invalid) {
      return false;
    }

    if (!form.team.$viewValue.length) {
      return false;
    }

    if (!form.employee.$viewValue.length) {
      return false;
    }

    return true;
  };

  $scope.dialogOpen = true;

  $scope.accept = () => {
    $scope.dialogOpen = false;
  };

  $scope.reject = () => {
    let isConfirmed = true;

    if ($scope.formData.team.length > 0
        || $scope.formData.employee.length > 0) {
      // eslint-disable-next-line no-undef, no-alert
      isConfirmed = window.confirm('You have unsaved edits. Are you sure you want to close?');
    }

    if (isConfirmed) {
      $scope.formData.sendEmail = false;
      $scope.formData.team = '';
      $scope.formData.employee = '';
      $scope.dialogOpen = false;
    }
  };
};

AppCtrl.$inject = ['$scope'];

export default AppCtrl;
