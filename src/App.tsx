import {Routes, Route} from 'react-router-dom'
import { Footer, Navbar, ScrollTop } from './components';
import { Home } from './pages/Home/Home';
import './App.css';

function App() {
  return (
   <>
   <Navbar />
   <Routes>
     <Route path='/' element={<Home title="home" />} />
   </Routes>
   <ScrollTop/>
   <Footer />
   </>
  );
}
export default App;
