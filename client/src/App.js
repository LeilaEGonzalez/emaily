import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hi there! Welcome to Emaily!</p>
				<a
					className="App-link"
					href="http://localhost:9000/.netlify/functions/api/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Sign in with Google
				</a>
			</header>
		</div>
	);
}

export default App;
