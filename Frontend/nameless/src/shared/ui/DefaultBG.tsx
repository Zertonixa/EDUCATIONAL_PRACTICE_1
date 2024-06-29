import React from "react";
import { Flex } from "@chakra-ui/react";



interface DefaultBGProps{
    children?: React.ReactNode
}



export const DefaultBG  = (props: DefaultBGProps) => {

    return (

        <Flex w = '1000px' h = '500px' bgColor = '#0f141c' direction = 'column' justifyContent = 'center' borderRadius = '25px' border = '3px solid #202133'>
            {props.children}
        </Flex> 

    )


}