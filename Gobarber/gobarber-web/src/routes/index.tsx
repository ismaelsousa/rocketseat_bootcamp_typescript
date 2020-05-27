import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ForgoPassword from '../pages/ForgoPassword';

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route path="/" exact component={SignIn} />
			<Route path="/signup" component={SignUp} />
			<Route path="/forgot-password" component={ForgoPassword} />

			<Route path="/dashboard" isPrivate component={Dashboard} />
		</Switch>
	);
};

export default Routes;
