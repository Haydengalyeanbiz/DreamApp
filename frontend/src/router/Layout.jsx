import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { thunkAuthenticate } from '../redux/sessionReducer';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';

export default function Layout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoaded, setIsLoaded] = useState(false);
	const sessionUser = useSelector((state) => state.session.user);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<Navbar />
			<div className='main-content'>{isLoaded && <Outlet />}</div>
		</>
	);
}
