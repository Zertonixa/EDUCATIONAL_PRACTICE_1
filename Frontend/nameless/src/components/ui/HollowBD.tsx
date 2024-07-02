import React from "react";

import { Flex, Button, Text } from "@chakra-ui/react";






export const HollowBDTable = () => {

    return(

        <Flex w = '100%' h = '100%' alignItems = 'center' justifyContent = 'center' direction = 'column'>
            <Text textAlign = 'center' color = '#fff' fontSize = '22px'>Похоже, наша база данных пуста. <br/> Вы можете заполнить её, перейдя по на страницу заполнения</Text>
            <Button 
                w = '120px' 
                h = '40px'
                marginTop = '20px'
                backgroundColor = "#0b6799" 
                _hover = {{bgColor: "#085178"}} 
                _focus = {{bgColor: "#074261"}} 
                color = '#fff' 
                onClick = {() => window.location.assign('http://localhost:3000')}>Перейти</Button>
        </Flex>

    )

}