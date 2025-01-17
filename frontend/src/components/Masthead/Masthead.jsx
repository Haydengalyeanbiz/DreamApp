import { useSelector } from 'react-redux';
import './Masthead.css';

const Masthead = () => {
	const user = useSelector((state) => state.session.user);
	return (
		<div className='masthead-wrapper'>
			{/* <h1 className='masthead-title'>Welcome back {user.first_name}</h1> */}
			<div className='masthead-btn-holder'>
				<button className='masthead-add-new-btn'>Add a new Dream</button>
			</div>
		</div>
	);
};

export default Masthead;
