import './App.css';
import { Routes, Route } from "react-router-dom"
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { RecentActivity } from './pages/RecentActivity';
import "./navbar/NavbarStyles.css"
import "./pages/PageStyles.css"
import "./mainSection/MainSectionStyles.css"
import "./otherSection/OtherSectionsStyles.css"
import "./featuresSection/FeaturesSectionStyles.css"
import "./newsPostsSection/NewsPostsSectionStyles.css"
import "./footerSection/FooterSectionStyles.css"
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/recentactivity" element={<RecentActivity/>} /> 
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
