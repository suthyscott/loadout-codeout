import {useState, useEffect} from 'react'
import axios from 'axios'
import LoadoutItem from '../../Elements/LoadoutItem'

const Home = () => {
   const [loadouts, setLoadouts] = useState([])

   const getAllLoadouts = () => {
    console.log('hit getallloaoudtsa')
    axios.get('/loadout')
      .then(res => setLoadouts(res.data))
      .catch(err => console.log(err))
   }

   useEffect(getAllLoadouts,[])

  return (
    <div>
      {loadouts.map(loadout => {
        return <LoadoutItem key={loadout.id} loadout={loadout} getAllLoadouts={getAllLoadouts}/>
      })}
    </div>
  )
}

export default Home