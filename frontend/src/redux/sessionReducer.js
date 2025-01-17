// !ACTIONS
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// !ACTION CREATORS
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

// !THUNKS
export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch('/api/auth/');
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async (dispatch) => {
	console.log('the user credentials', credentials);
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: 'Something went wrong. Please try again' };
	}
};

export const thunkSignup = (user) => async (dispatch) => {
	console.log('this is the thunk user', user);
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
	} else if (response.status < 500) {
		const errorMessages = await response.json();
		return errorMessages;
	} else {
		return { server: 'Something went wrong. Please try again' };
	}
};

export const thunkLogout = () => async (dispatch) => {
	const response = await fetch('/api/auth/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		const success = await response.json();
		dispatch(removeUser());
		return success;
	}
};

// !INITIAL STATE
const initialState = {
	user: null,
	isAuthenticated: false,
};

function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload, isAuthenticated: true };
		case REMOVE_USER:
			return { ...state, user: null, isAuthenticated: false };
		default:
			return state;
	}
}

export default sessionReducer;
