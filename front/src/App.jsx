import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './pages'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
function App() {
  return (
    <Router>
        <Home/>
    </Router>
  );
}

export default App;