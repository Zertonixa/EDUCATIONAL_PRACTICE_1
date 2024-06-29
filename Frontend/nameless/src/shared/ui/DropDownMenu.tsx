import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FaArrowRotateLeft } from "react-icons/fa6";



interface DropDownMenuProps{
    data: string,
    title: string,
    list: string[],
    funct: any
}

export const DropDownMenu = (props: DropDownMenuProps) => {

    const [visible, setVisible] = React.useState(false)

    const [value, setValue] = React.useState('Любое')

    return(
        <Flex  w = '350px' h = '50px' border = '1px solid #191a29' justifyContent = 'center' alignItems = 'center' borderRadius = '5px' bgColor = 'inherit  '>
            <Flex color = '#191a29' marginRight = '30px' fontSize = '20px' opacity = '0.9'>{props.title}:</Flex>
            <Flex position = 'relative' marginLeft = '0'>
                <Flex 
                    w = '200px' 
                    h = '35px'
                    bgColor = '#23243b'
                    color = '#000'
                    justifyContent = 'center'
                    alignItems = 'center'
                    border = '1px solid #191a29'
                    borderRadius = '5px'
                    transition = '0.2s ease'
                    _hover = {{cursor: 'pointer', bgColor: '#212338'}}
                    onClick = {() => setVisible(!visible)}>
                        {value}
                </Flex>
                { visible ? <Flex direction = 'column' position = 'absolute' marginTop = '35px'>
                    {props.list.map(key => <Flex 
                        w = '200px' 
                        h = '35px'
                        bgColor = '#23243b'
                        color = '#000'
                        justifyContent = 'center'
                        alignItems = 'center'
                        border = '1px solid #191a29'
                        borderTopRadius = {props.list.indexOf(key) === 0 ? '3px' : 'none'}
                        borderBottomRadius = {props.list.indexOf(key) === props.list.length - 1 ? '3px' : 'none'}
                        transition = '0.2s ease'
                        onClick={() => {setValue(key); setVisible(false); props.funct(data => ({...data, [props.data]: key}))} }
                        _hover = {{cursor: 'pointer', bgColor: '#212338'}}>{key}</Flex>)}
                </Flex>
                : <></>}
            </Flex>
            <Button w = '35px' 
                    h = '35px' 
                    bgSize = 'cover' 
                    marginLeft = '10px'
                    onClick = {() => {props.funct(data => ({...data, [props.data]: null})); setValue('Любое'); setVisible(false)}}
                    ><FaArrowRotateLeft/></Button>
        </Flex>
    )
}