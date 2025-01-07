import { thunkLogin } from '../../redux/sessionReducer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};
		if (!formData.password.length) {
			errors.password = 'Must provide a password.';
		}
		if (formData.password.length < 8) {
			errors.password = 'Password must be longer than 8 characters.';
		}
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			setHasSubmitted(true);
			return;
		}

		const serverResponse = await dispatch(
			thunkLogin({
				email: formData.email,
				password: formData.password,
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			setHasSubmitted(false);
			navigate('/');
		}
	};

	return (
		<div className='login-form-wrapper'>
			<form
				className='login-form'
				onSubmit={handleSubmit}
			>
				<div className='login-titles'>
					<h2>Login! </h2>
					<h3>Start Dreaming</h3>
				</div>
				<label className=''>
					Email
					<input
						type='text'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label>
				{hasSubmitted && errors.email && <p>{errors.email}</p>}
				<label>
					Password
					<input
						type='text'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				{hasSubmitted && errors.password && <p>{errors.password}</p>}
				<button type='submit'>Log In</button>
			</form>
		</div>
	);
};

export default LoginForm;
