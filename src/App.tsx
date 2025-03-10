import React from 'react';
// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';  // 追加
import SignUp from './pages/SignUp.tsx';  // 追加
import Main from './pages/Main.tsx';
import UserProfile from './pages/UserProfile.tsx';
import { UserProvider } from "./providers/UserProvider.tsx"; // 追加（UserProviderコンポーネントを組み込む）
import './App.css';
import { LoginUserProvider } from './providers/LoginUserProvider.tsx';

function App() {
  return (
    <div className="App">
      <LoginUserProvider>
  
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </UserProvider>

      </LoginUserProvider>
    </div>
  );
}

export default App;