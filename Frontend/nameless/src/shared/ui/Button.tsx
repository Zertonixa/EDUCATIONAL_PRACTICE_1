import React from "react";
import { Button } from "@chakra-ui/react";


interface ButtonProps{
    text: string
    isLoading: boolean
}

export const SubmitButton = (props: ButtonProps) => {

    return (

            <Button
                isLoading = {props.isLoading}
                bgColor = "#108acc"
                color = 'inherit'
                transition = '0.3s ease'
                _hover={{bgColor: "#0d7cb8"}}
                _active={{bgColor: "#085b87"}}
            >{props.text}</Button>

    )

}