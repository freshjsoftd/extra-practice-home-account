import { useState } from 'react';
import api from '../../api';

function AuthForm() {
	const [users, setUsers] = useState([]);

	const [fullName, setFullName] = useState('');

	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const loginHandle = async () => {
		try {
			const { data } = await api.post('/auth/login', {
				email,
				password,
			});
			console.log('Data is: ', data);
		} catch (error) {
			console.log('Login error is: ', error);
		}
	};

	const refreshHandle = async () => {
		try {
			const { data } = await api.get('/auth/refresh', {
				withCredentials: true,
			});
			console.log(data);
			setUsers([]);
			// localStorage.setItem('accessToken', data.accessToken)
		} catch (error) {
			console.log('Refresh error is: --------', error);
		}
	};

	const registrationHandle = async () => {
		try {
			const { data } = await api.post('/auth/registration', {
				fullName,
				email,
				password,
			});
			console.log('Data is: ', data.accessToken);
			localStorage.setItem('accessToken', data.accessToken);
		} catch (error) {
			console.log('Registration error is: ', error);
		}
	};

	const getUsers = async () => {
		const { data } = await api.get('/auth/users', {
			withCredentials: true,
		});
		setUsers(data);
		console.log(data);
	};

	return (
		<>
			<ol>
				{users.map((user) => {
					return (
						<li key={user._id}>
							{user._id} ..... {user.email}
						</li>
					);
				})}
			</ol>
			<input
				type='text'
				value={fullName}
				placeholder='Full name'
				onChange={(e) => setFullName(e.target.value)}
			/>
			<input
				type='text'
				value={email}
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				value={password}
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={loginHandle}>Login</button>
			<button onClick={registrationHandle}>Registration</button>
			<button onClick={getUsers}>Get users</button>
			<button onClick={refreshHandle}>Refresh</button>
		</>
	);
}

export default AuthForm;
