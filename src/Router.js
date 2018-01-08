import React from 'react';
import { Stack, Scene, Router, Actions, Drawer } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import CreateUser from './components/CreateUser';
import PasswordReset from './components/PasswordReset';
import Sold from './components/Sold';
import SoldEmployeeEdit from './components/SoldEmployeeEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 0, backgroundColor: 'transparent' }}>
      <Stack key="root" hideNavBar="true">
        <Scene key="auth" hideNavBar="true">
          <Scene key="login" component={LoginForm} hideNavBar="true" title="Please Login" />
          <Scene key="createUser" component={CreateUser} title="Create A New Account" />
          <Scene key="password" component={PasswordReset} title="Reset Your Password" />
        </Scene>
        <Scene key="main">
          <Scene
            hideNavBar="true"
            onRight={() => Actions.employeeCreate()}
            rightTitle="Add"
            key="employeeList"
            component={EmployeeList}
            title="Inventory"
            initial
          />
          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Create Employee"
            hideNavBar="true"
          />
          <Scene
            hideNavBar="true"
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
          <Scene
            hideNavBar="true"
            key="soldEmployeeEdit"
            component={SoldEmployeeEdit}
            title="Edit Employee"
          />
          <Scene
            hideNavBar="true"
            key="sold"
            component={Sold}
            title="Sold List"
          />
         </Scene>
      </Stack>
    </Router>
  );
};

export default RouterComponent;
