import React from "react"
import { Input } from "@chakra-ui/react"



interface SearchInputProps{
    funct: any,
    title: string,
    width: string,
    placeholder: string,
}


export const SearchInput = (props: SearchInputProps) => {


    const handleChange = (event) => {props.funct(data => ({...data, [props.title]: event.target.value}))}

    return(

        <Input 
            w = {props.width}
            h = '40px' 
            borderRadius = '5px'
            placeholder = {props.placeholder}
            color = '#dba12c'
            bgColor = '#23243b'
            transition = '0.2s ease'
            borderColor = '#202133'
            onChange = {handleChange}
            _focus={{borderColor: '#191a29', boxShadow: 'none', bgColor: '#222338'}}
            _hover = {{borderColor: '#191a29'}}/>
    )
}