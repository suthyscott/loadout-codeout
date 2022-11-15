import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import AddLoadout from './Components/AddLoadout/AddLoadout'

function App() {
  return (
    <div className="App">
     <Routes>
      <Route index element={<Home/>}/>
      <Route path='/addloadout' element={<AddLoadout/>}/>
     </Routes>
    </div>
  );
}

export default App;
