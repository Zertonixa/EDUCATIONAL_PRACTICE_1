import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";



interface VacancyCardProps{
    data: {
        name: string,
        title: string,
        test: string,
        url: string,
        employment: string,
        salary: string,
        schedule: string,
        professional_roles: string,
        
    }
}

interface SalaryProps{
    obj:{
        from: string,
        to: string,
        currency: string,
    }
}

export const VacancyCard = (props:VacancyCardProps) => {

    const firstPack = ['Информация', ['Организация' ,props.data.name], ['Роль', props.data.professional_roles]]
    const secondPack = ['График', ['Рабочий день', props.data.schedule], ['Занятость', props.data.employment ]]

    const salary:SalaryProps = eval('({obj:' + props.data.salary.replace(/None/g, "'Не указано'").replace("False", "'Нет'").replace("True", "'Да'") + '})') 

    const packedData = [firstPack, secondPack]

    return(

        <Flex w = '100%' h = '200px' border = '1px solid #2b3138' direction = 'column'>
            <Flex 
                position = 'relative' 
                w = '100%' 
                h = '50px' 
                alignItems = 'center' 
                justifyContent = 'center' 
                borderBottomRadius = '5px' 
                border = '1px solid #2b3138' 
                color = '#dba12c' 
                fontSize = '16px'>

                <Text w = '85%'>{props.data.title}</Text>
                <Button 
                    onClick = {() => window.open(props.data.url)} 
                    position = 'absolute' 
                    fontSize = '10px' 
                    left = '90%' w = '50px' 
                    h = '25px' 
                    color = '#fff' 
                    backgroundColor = '#238636'
                    _hover = {{backgroundColor: '#1e6e2d'}}>
                    Перейти
                </Button>
            </Flex>
            <Flex h = '150px'>
                {packedData.map(el => <Flex w = '100%' h = '100%' direction = 'column' border = '1px solid #2b3138'>
                    <Flex 
                        alignItems = 'center' 
                        justifyContent = 'center' 
                        w = '100%' 
                        h = '50px' 
                        color = '#6f7d93' 
                        fontSize = '18px' >{el[0]}</Flex>

                    {el.slice(1).map(data => <Flex alignItems = 'center' marginLeft = '5px' h = '50px' textAlign = 'center' justifyContent = 'center' color = '#6f7d93' fontSize = '11px'>{data[0]} : {data[1]}</Flex>)}
                </Flex>)}
                <Flex w = '100%' h = '100%' direction = 'column' border = '1px solid #2b3138'>
                    <Flex w = '100%' h = '60px' alignItems = 'center' justifyContent = 'center' color = '#6f7d93' fontSize = '18px'>Условия</Flex>
                    <Flex 
                        alignItems = 'center' 
                        h = '40px' 
                        textAlign = 'center' 
                        justifyContent = 'center' 
                        color = '#6f7d93' 
                        fontSize = '12px'>
                            Зарплата : {props.data.salary !== 'None' ? `от ${salary.obj.from} до ${salary.obj.to} ${salary.obj.currency}` : 'Не указано' }
                    </Flex>
                    <Flex 
                        alignItems = 'center' 
                        h = '40px' 
                        textAlign = 'center' 
                        justifyContent = 'center' 
                        color = '#6f7d93' 
                        fontSize = '11px'>
                            Тестовое : {props.data.test === 'True' ? "Имеется" : "Не имеется" }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    )

}