import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;