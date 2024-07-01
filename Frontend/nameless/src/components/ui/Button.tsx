import React from "react";
import { Button } from "@chakra-ui/react";

import { updateBd } from "../../api/UpdateBD.ts";

interface ButtonProps{
    text: string
    isLoading: boolean
    data: {}
}

export const SubmitButton = (props: ButtonProps) => {

    return (

            <Button
                height = '35px'
                isLoading = {props.isLoading}
                bgColor = "#0b6799"
                color = 'inherit'
                transition = '0.3s ease'
                onClick = {() => updateBd({})}
                _hover={{bgColor: "#085178"}}
                _active={{bgColor: "#074261"}}
            >{props.text}</Button>

    )

}