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
import { DropboxUpload } from './components/DropBoxUpload.tsx';

function App() {
  return (
    <div className="App">
      {/* <UserProvider>
      <LoginUserProvider> 
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </LoginUserProvider>
      </UserProvider> */}
      <h1>ReactとDropboxで画像アップロード</h1>
      <DropboxUpload />
    </div>
  );
}

export default App;