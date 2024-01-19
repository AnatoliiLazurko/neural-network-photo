import { Route, Routes } from 'react-router-dom';
import './App.css';
import FirstNN from './components/FirstNN/FirstNN';
import SecondAI from './components/SecondAI/SecondAI';

function App() {
  return (
    <Routes>
      <Route path="/naural-network/first" element={<FirstNN />} />
      <Route path="/naural-network/second" element={<SecondAI/>} />
    </Routes>
  );
}

export default App;
