import React from "react";
import { Flex } from "@chakra-ui/react";


interface LayoutProps{
    children?: React.ReactNode
}


export const Layout = (props: LayoutProps) => {

    return(

        <Flex w = '100%' h = '100vh' bgColor = '#0d1117' direction = 'column' alignItems = 'center' justifyContent = 'center'>
            {props.children}
        </Flex>

    )

}