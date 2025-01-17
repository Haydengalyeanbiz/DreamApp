import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAuthenticate } from '../redux/sessionReducer';
import Navbar from '../components/Navbar/Navbar';

export default function Layout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useEffect(() => {
		if (isLoaded && !sessionUser) {
			navigate('/login');
		}
	}, [isLoaded, sessionUser, navigate]);
	return (
		<>
			<Navbar />
			<div className='main-content'>
				<Outlet />
			</div>
		</>
	);
}
