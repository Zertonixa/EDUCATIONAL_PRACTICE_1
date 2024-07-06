import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { FaArrowRotateLeft } from "react-icons/fa6";





interface DropDownMenuProps{
    data: string,
    title: string,
    list: string[][],
    funct: any,
    convert: boolean,
}

export const DropDownMenu = (props: DropDownMenuProps) => {

    const [visible, setVisible] = React.useState(false)

    const [value, setValue] = React.useState('Любое')

    return(
        <Flex  
            w = '350px' 
            h = '50px' 
            border = '1px solid #191a29' 
            justifyContent = 'center' 
            alignItems = 'center' 
            borderRadius = '5px' 
            bgColor = 'inherit'>
            <Flex 
                color = '#fff' 
                marginRight = '30px' 
                w = '50px' 
                fontSize = '14px' 
                opacity = '0.9' 
                alignItems = 'center' 
                justifyContent = 'center'>{props.title}:</Flex>
            <Flex position = 'relative'>
                <Flex 
                    w = '150px' 
                    h = '35px'
                    bgColor = '#23243b'
                    color = '#000'
                    justifyContent = 'center'
                    fontSize = '14px'
                    alignItems = 'center'
                    border = '1px solid #191a29'
                    borderRadius = '5px'
                    transition = '0.2s ease'
                    _hover = {{cursor: 'pointer', bgColor: '#212338'}}
                    onClick = {() => setVisible(!visible)}>
                        {value}
                </Flex>
                { visible ? <Flex direction = 'column' position = 'absolute' marginTop = '35px'>
                    {props.list.map((key,index) => <Flex
                        key = {index} 
                        w = '150px' 
                        h = '35px'
                        fontSize = '14px'
                        bgColor = '#23243b'
                        color = '#000'
                        justifyContent = 'center'
                        alignItems = 'center'
                        border = '1px solid #191a29'
                        zIndex = '10'
                        borderTopRadius = {props.list.indexOf(key) === 0 ? '3px' : 'none'}
                        borderBottomRadius = {props.list.indexOf(key) === props.list.length - 1 ? '3px' : 'none'}
                        transition = '0.2s ease'
                        onClick={() => {setValue(key[1]); setVisible(false); props.funct(data => ({...data, [props.data]: props.convert ? key[0] : key[1]}))} }
                        _hover = {{cursor: 'pointer', bgColor: '#212338'}}>{key[1]}</Flex>)}
                </Flex>
                : <></>}
            </Flex>
            <Button w = '35px' 
                    h = '35px' 
                    bgSize = 'cover' 
                    marginLeft = '10px'
                    bgColor = '#23243b'
                    _hover={{bgColor: '#212338'}}
                    onClick = {() => {props.funct(data => ({...data, [props.data]: null})); setValue('Любое'); setVisible(false)}}
                    ><FaArrowRotateLeft color = '#000' /></Button>
        </Flex>
    )
}