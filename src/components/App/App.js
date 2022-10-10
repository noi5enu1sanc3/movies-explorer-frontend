import './App.css';
import Footer from '../Footer/Footer'
import Header from '../Header/Header';
import Main from '../Main/Main';
import NavTab from '../NavTab/NavTab';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <Main />
      <NavTab />
      <Footer />
    </div>
  );
}

export default App;
