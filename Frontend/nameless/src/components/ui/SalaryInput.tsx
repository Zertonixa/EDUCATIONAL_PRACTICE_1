import React from "react";

import { Flex, Input } from "@chakra-ui/react";



interface SalaryInputProps{
    funct: any,
    title: string,
    subtitle: string,
}

const list = ['RUR', 'USD' , 'KZT', 'BYR', 'EUR']

export const SalaryInput = (props: SalaryInputProps) => {



    const handleChangeCurrency = (event) => {props.funct(data => ({...data, [props.subtitle]: event.target.value}))}    //Изменение состояния зарплаты

    const handleChange = (event) => {props.funct(data => ({...data, [props.title]: event.target.value}))}    //Изменение состояния валюты


    return(

        <Flex w = '400px' h = '50px' border = '1px solid #191a29' borderRadius = '3px' alignItems = 'center' >
            <Flex w = '150px' fontSize = '20px' color = '#6f7d93'  alignItems = 'center' justifyContent = 'center'>Зарплата:</Flex>
            <Input
                w = '150px' 
                h = '40px' 
                borderRadius = '5px'
                placeholder = 'Значение'
                color = '#dba12c'
                bgColor = '#23243b'
                transition = '0.2s ease'
                borderColor = '#202133'
                _focus={{borderColor: '#191a29', boxShadow: 'none', bgColor: '#222338'}}
                _hover = {{borderColor: '#191a29'}}
                onChange = {handleChange}
                />

                <select onChange = {handleChangeCurrency} style = {{width: '60px', height: '40px', borderRadius: '3px', backgroundColor: '#23243b', marginLeft: '10px', color: '#000'}}>
                    {list.map((el,index) => <option key = {index} style={{color: '#000', height: '40px'}}>{el}</option>)}
                </select>
            
        </Flex>

    )

}