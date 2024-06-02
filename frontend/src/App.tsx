import './App.css'
import { Routes, Route } from 'react-router-dom'
import NewsFeed from './pages/homepage/NewsFeed'
import TabsDemo from './pages/authenticaton/Authentication'
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import Navigation from './components/HomePage/Navigation'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'
import AddNewPage from "./pages/Posts/AddNewPost"
import AllProfiles from './pages/Profile/AllProfiles'
import DetailPost from './pages/Posts/DetailPost'
import EditFullPost from './pages/Posts/EditFullPosts'
import ChatsPage from './pages/chats/ChatsPage'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ProtectedRoute><Navigation /></ProtectedRoute>
      <ToastContainer autoClose={2000}/>
      <Routes>
        <Route path="/" element={<TabsDemo />} />
        <Route path="/home" element={<ProtectedRoute><NewsFeed /></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>}></Route>
        <Route path="/addnewpost" element={<ProtectedRoute><AddNewPage /></ProtectedRoute>}></Route>
        <Route path="/allprofiles" element={<ProtectedRoute><AllProfiles /></ProtectedRoute>}></Route>
        <Route path="/detailPost/:id" element={<ProtectedRoute><DetailPost /></ProtectedRoute>}></Route>
        <Route path="/editPost/:id" element={<ProtectedRoute><EditFullPost /></ProtectedRoute>}></Route>
        <Route path="/chats" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>}></Route>

      </Routes>
    </>
  )
}

export default App
