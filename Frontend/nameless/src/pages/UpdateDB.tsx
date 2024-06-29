import React from "react"
import { updateBD } from "../api/UpdateBD.ts"

export const UpdateDB = () => {

    const data = {
        text: 'Инженер',
        salary: '60000'
    }

    return(
        <button style = {{width: '200px', height: '100px'}} onClick = {() => updateBD({data})}>DA</button>
    )

}