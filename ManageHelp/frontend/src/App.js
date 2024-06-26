import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

//pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import WorkspaceView from './pages/WorkspaceView'
import Navbar from './components/Navbar'
import Schedule from './pages/Schedule'
import EditSchedules from './pages/EditSchedules'
import ViewSchedules from './pages/ViewSchedules'

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login"/>}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/"/>}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
            <Route 
              path="/Settings"
              element={user ? <Settings /> : <Navigate to="/"/>}
            />
            <Route 
              path="/Home"
              element={user ? <Home /> : <Navigate to="/Home"/>}
            />     
            <Route
              path="/WorkspaceView/:id"
              element={user ? <WorkspaceView /> : <Navigate to="/"/>}
            />
            <Route
              path="/ViewSchedules/:id"
              element={user ? <ViewSchedules /> : <Navigate to="/"/>}
            />
            <Route
            path='/EditSchedules/:id'
            element={user ? <EditSchedules/> : <Navigate to="/" />}
          />
          </Routes>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
