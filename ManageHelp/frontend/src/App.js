import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Settings from './pages/Settings';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes> 
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/"
              element={< Settings/>}
            />
          </Routes>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
