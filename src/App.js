import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import AddLoadout from './Components/AddLoadout/AddLoadout'
import Auth from './Components/Auth/Auth'
import Header from './Components/Nav/Header'
import MyLoadouts from './Components/MyLoadouts/MyLoadouts';
import Loadout from './Components/Loadout/Loadout'


function App() {
  return (
    <div className="App">
      <Header/>
     <Routes>
      <Route index element={<Home/>}/>
      <Route path='/addloadout' element={<AddLoadout/>}/>
      <Route path='/myloadouts' element={<MyLoadouts/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/loadout/:id' element={<Loadout/>}/>

     </Routes>
    </div>
  );
}

export default App;
