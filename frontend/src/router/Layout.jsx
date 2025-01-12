import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAuthenticate } from '../redux/sessionReducer';
import Navbar from '../components/Navbar/Navbar';

export default function Layout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);
	return (
		<>
			<Navbar />
			<div className='main-content'>
				<Outlet />
			</div>
		</>
	);
}
