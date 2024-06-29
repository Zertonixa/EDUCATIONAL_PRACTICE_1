import React from "react"
import { Input } from "@chakra-ui/react"





export const SearchInput = () => {

    return(

        <Input 
            w = '500px' 
            h = '40px' 
            borderRadius = '5px'
            placeholder = 'Ключевое слово'
            color = '#dba12c'
            bgColor = '#23243b'
            transition = '0.2s ease'
            borderColor = '#202133'
            _focus={{borderColor: '#191a29', boxShadow: 'none', bgColor: '#222338'}}
            _hover = {{borderColor: '#191a29'}}/>
    )
}