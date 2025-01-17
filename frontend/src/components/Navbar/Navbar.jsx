import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkLogout } from '../../redux/sessionReducer';

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.session.user);

	const handleLogin = () => {
		navigate('/login');
	};

	const handleSignUp = () => {
		navigate('/sign-up');
	};

	const handleSignOut = () => {
		dispatch(thunkLogout());
		navigate('/login');
	};

	return (
		<div className='navbar-wrapper'>
			<div className='navbar-content'>
				<button className='navbar-logo'>LucidLullaby</button>
				{!user && (
					<div className='navbar-no-user'>
						<button
							className='nav-btn login'
							onClick={() => handleLogin()}
						>
							Login
						</button>
						<button
							className='nav-btn signup'
							onClick={() => handleSignUp()}
						>
							SignUp
						</button>
					</div>
				)}
				{user && (
					<div className='navbar-no-user'>
						<button
							className='nav-btn signout'
							onClick={() => handleSignOut()}
						>
							Sign Out
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
