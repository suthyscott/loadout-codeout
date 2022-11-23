import { useState, useContext } from "react"
import "./LoadoutItem.css"
import axios from "axios"
import AuthContext from "../store/authContext"

const LoadoutItem = ({ loadout, getAllLoadouts, myLoadouts }) => {
    const authCtx = useContext(AuthContext)

    const [editing, setEditing] = useState(false)

    const [primaryWeapon, setPrimaryWeapon] = useState(loadout.primaryWeapon)
    const [secondaryWeapon, setSecondaryWeapon] = useState(
        loadout.secondaryWeapon
    )
    const [tacticalEquipment, setTacticalEquipment] = useState(
        loadout.tacticalEquipment
    )
    const [lethalEquipment, setLethalEquipment] = useState(
        loadout.lethalEquipment
    )
    const [perkOne, setPerkOne] = useState(loadout.perkOne)
    const [perkTwo, setPerkTwo] = useState(loadout.perkTwo)
    const [perkThree, setPerkThree] = useState(loadout.perkThree)
    const [perkFour, setPerkFour] = useState(loadout.perkFour)
    const [fieldUpgradeOne, setFieldUpgradeOne] = useState(
        loadout.fieldUpgradeOne
    )
    const [fieldUpgradeTwo, setFieldUpgradeTwo] = useState(
        loadout.fieldUpgradeTwo
    )
    const [picture, setPicture] = useState(loadout.picture)

    const updateLoadout = e => {
        e.preventDefault()
        const body = {
            primaryWeapon,
            secondaryWeapon,
            tacticalEquipment,
            lethalEquipment,
            perkOne,
            perkTwo,
            perkThree,
            perkFour,
            fieldUpgradeOne,
            fieldUpgradeTwo,
            picture,
            loadoutId: loadout.id
        }

        axios
            .put("/loadout", body)
            .then(res => {
                setEditing(false)
                getAllLoadouts()
            })
            .catch(err => console.log(err))
    }

    const saveToMyLoadouts = () => {
        axios
            .post("/myloadouts", {
                userId: authCtx.userId,
                loadoutId: loadout.id
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    console.log(loadout)
    return (
        <div className="loadout_card">
            {!editing ? (
                <div>
                    <h2>USER: {loadout.user.username}</h2>
                    <p> Primary Weapon: {loadout.primaryWeapon}</p>
                    <p>Secondary Weapon: {loadout.secondaryWeapon}</p>
                    <p>lethal equipment: {loadout.lethalEquipment}</p>
                    <p>tactical equipment: {loadout.tacticalEquipment}</p>
                    <p>perk One: {loadout.perkOne}</p>
                    <p> perk two: {loadout.perkTwo}</p>
                    <p>perk three: {loadout.perkThree}</p>
                    <p>perk four: {loadout.perkFour}</p>
                    <p>field Upgrade: {loadout.fieldUpgradeOne}</p>
                    <p>field Upgrade 2: {loadout.fieldUpgradeTwo}</p>
                    <p>picture: {loadout.picture}</p>
                    {myLoadouts ? (
                        <button>Remove</button>
                    ) : (
                        <button onClick={() => saveToMyLoadouts()}>
                            Save Loadout
                        </button>
                    )}
                </div>
            ) : (
                <form onSubmit={e => updateLoadout(e)}>
                    <input
                        placeholder="Primary Weapon"
                        type="text"
                        onChange={e => setPrimaryWeapon(e.target.value)}
                        value={primaryWeapon}
                    />
                    <input
                        placeholder="Secondary Weapon"
                        type="text"
                        onChange={e => setSecondaryWeapon(e.target.value)}
                        value={secondaryWeapon}
                    />
                    <input
                        placeholder="Tactical Equipment"
                        type="text"
                        onChange={e => setTacticalEquipment(e.target.value)}
                        value={tacticalEquipment}
                    />
                    <input
                        placeholder="Lethal Equipment"
                        type="text"
                        onChange={e => setLethalEquipment(e.target.value)}
                        value={lethalEquipment}
                    />
                    <input
                        placeholder="Perk One"
                        type="text"
                        onChange={e => setPerkOne(e.target.value)}
                        value={perkOne}
                    />
                    <input
                        placeholder="Perk Two"
                        type="text"
                        onChange={e => setPerkTwo(e.target.value)}
                        value={perkTwo}
                    />
                    <input
                        placeholder="Perk Three"
                        type="text"
                        onChange={e => setPerkThree(e.target.value)}
                        value={perkThree}
                    />
                    <input
                        placeholder="Perk Four"
                        type="text"
                        onChange={e => setPerkFour(e.target.value)}
                        value={perkFour}
                    />
                    <input
                        placeholder="Field Upgrade One"
                        type="text"
                        onChange={e => setFieldUpgradeOne(e.target.value)}
                        value={fieldUpgradeOne}
                    />
                    <input
                        placeholder="Field Upgrade Two"
                        type="text"
                        onChange={e => setFieldUpgradeTwo(e.target.value)}
                        value={fieldUpgradeTwo}
                    />
                    <input
                        placeholder="Picture"
                        type="text"
                        onChange={e => setPicture(e.target.value)}
                        value={picture}
                    />
                    <button>submit</button>
                </form>
            )}
            {!myLoadouts ? (
                <button onClick={() => setEditing(!editing)}>
                    {editing ? "Cancel Changes" : "Edit Loadout"}
                </button>
            ) : null}
        </div>
    )
}

export default LoadoutItem
