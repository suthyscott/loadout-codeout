import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import LoadoutItem from '../../Elements/LoadoutItem'

function MyLoadouts() {
  const authCtx = useContext(AuthContext)
  const [myloadouts, setMyLoadouts] = useState([])

  const getAllMyLoadouts = () => {
    axios.get(`/myloadouts/${authCtx.userId}`)
      .then(res => {
        console.log(res.data)
        setMyLoadouts(res.data)
      })
  }

  useEffect(getAllMyLoadouts, [])

  return (
    <div>
      {myloadouts.map(loadout => {
        return <LoadoutItem loadout={loadout.loadout} myLoadouts={true} />
      })}
    </div>
  )
}

export default MyLoadouts