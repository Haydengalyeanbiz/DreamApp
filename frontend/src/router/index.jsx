import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage.jsx';
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import SignUpForm from '../components/SignUpForm/SignUpForm.jsx';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/login',
				element: <LoginForm />,
			},
			{
				path: '/sign-up',
				element: <SignUpForm />,
			},
		],
	},
]);
