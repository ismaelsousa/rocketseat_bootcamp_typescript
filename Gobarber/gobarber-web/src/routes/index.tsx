import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import ForgoPassword from '../pages/ForgoPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/forgot-password" component={ForgoPassword} />
			<Route path="/reset-password" component={ResetPassword} />

			<Route path="/dashboard" isPrivate component={Dashboard} />
			<Route path="/profile" isPrivate component={Profile} />
		</Switch>
	);
};

export default Routes;
