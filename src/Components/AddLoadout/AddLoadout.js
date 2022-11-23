import {useContext, useState} from 'react'
import AuthContext from '../../store/authContext'
import axios from 'axios'

const AddLoadout = () => {
  const authCtx = useContext(AuthContext)

  const [primaryWeapon, setPrimaryWeapon] = useState('')
  const [secondaryWeapon, setSecondaryWeapon] = useState('')
  const [tacticalEquipment, setTacticalEquipment] = useState('')
  const [lethalEquipment, setLethalEquipment] = useState('')
  const [perkOne, setPerkOne] = useState('')
  const [perkTwo, setPerkTwo] = useState('')
  const [perkThree, setPerkThree] = useState('')
  const [perkFour, setPerkFour] = useState('')
  const [fieldUpgradeOne, setFieldUpgradeOne] = useState('')
  const [fieldUpgradeTwo, setFieldUpgradeTwo] = useState('')
  const [picture, setPicture] = useState('')

  const addLoadout = e => {
    e.preventDefault()
    const body = {primaryWeapon, secondaryWeapon, tacticalEquipment, lethalEquipment, perkOne, perkTwo, perkThree, perkFour, fieldUpgradeOne, fieldUpgradeTwo, picture}

    axios.post(`/loadout/${authCtx.userId}`, body)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <form onSubmit={e => addLoadout(e)}>
        <input placeholder='Primary Weapon' type='text' onChange={e => setPrimaryWeapon(e.target.value)}/>
        <input placeholder='Secondary Weapon' type='text' onChange={e => setSecondaryWeapon(e.target.value)}/>
        <input placeholder='Tactical Equipment' type='text' onChange={e => setTacticalEquipment(e.target.value)}/>
        <input placeholder='Lethal Equipment' type='text' onChange={e => setLethalEquipment(e.target.value)}/>
        <input placeholder='Perk One' type='text' onChange={e => setPerkOne(e.target.value)}/>
        <input placeholder='Perk Two' type='text' onChange={e => setPerkTwo(e.target.value)}/>
        <input placeholder='Perk Three' type='text' onChange={e => setPerkThree(e.target.value)}/>
        <input placeholder='Perk Four' type='text' onChange={e => setPerkFour(e.target.value)}/>
        <input placeholder='Field Upgrade One' type='text' onChange={e => setFieldUpgradeOne(e.target.value)}/>
        <input placeholder='Field Upgrade Two' type='text' onChange={e => setFieldUpgradeTwo(e.target.value)}/>
        <input placeholder='Picture' type='text' onChange={e => setPicture(e.target.value)}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddLoadout