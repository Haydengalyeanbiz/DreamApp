import { useState, useEffect } from 'react';
import { thunkSignup } from '../../redux/sessionReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
	});
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		const newErrors = {};
		if (!formData.first_name.trim())
			newErrors.first_name = 'First name is required';
		if (!formData.last_name.trim())
			newErrors.last_name = 'Last name is required';
		if (!formData.username.trim()) newErrors.username = 'Username is required';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!formData.email.includes('@') || !formData.email.includes('.')) {
			newErrors.email = 'Must provide a working email';
		}
		if (!formData.password) newErrors.password = 'Password is required';
		else if (formData.password.length < 8)
			newErrors.password = 'Password must be at least 8 characters long';
		setErrors(newErrors);
	}, [formData]);

	const handleSubmit = (event) => {
		event.preventDefault();
		setHasSubmitted(true);
		if (Object.keys(errors).length === 0) {
			dispatch(thunkSignup(formData));
			navigate('/');
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name</label>
				<input
					type='text'
					name='first_name'
					value={formData.first_name}
					onChange={handleChange}
				/>
				{hasSubmitted && errors.first_name && <div>{errors.first_name}</div>}
			</div>
			<div>
				<label>Last Name</label>
				<input
					type='text'
					name='last_name'
					value={formData.last_name}
					onChange={handleChange}
				/>
				{hasSubmitted && errors.last_name && <div>{errors.last_name}</div>}
			</div>
			<div>
				<label>Username</label>
				<input
					type='text'
					name='username'
					value={formData.username}
					onChange={handleChange}
				/>
				{hasSubmitted && errors.username && <div>{errors.username}</div>}
			</div>
			<div>
				<label>Email</label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
				/>
				{hasSubmitted && errors.email && <div>{errors.email}</div>}
			</div>
			<div>
				<label>Password</label>
				<input
					type='password'
					name='password'
					value={formData.password}
					onChange={handleChange}
				/>
				{hasSubmitted && errors.password && <div>{errors.password}</div>}
			</div>
			<button type='submit'>Sign Up</button>
		</form>
	);
};

export default SignUpForm;
