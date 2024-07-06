import React from "react";
import { Flex} from "@chakra-ui/react";

import { SearchInput, DropDownMenu, DefaultBG, SalaryInput } from "../components/ui/index.ts";

import { updateBd } from "../api/UpdateBD.ts";
import { Button } from "@chakra-ui/react";

import { dataParams } from "../components/maps/params.ts";


const firstMassive = [dataParams.area, dataParams.employment]  //Запаковка данных для map

const secondMassive = [dataParams.experience, dataParams.schedule]  //Запаковка данных для map



export const UpdateWidget = () => {

    const [loading, setLoading] = React.useState(false) //Отоброжение кнопки загрузки

    //Параметры парсинга
    const [data, setData] = React.useState({salary: null, text: null, area: null, experience: null, employment: null, schedule: null, currency: null,})


    const openLoading = () => {setLoading(true)}
    const closeLoading = () => {setLoading(false)}

    return(

        <Flex>
            <DefaultBG>
                <Flex alignItems = 'center' justifyContent = 'center' position = 'relative' w = '100%'>
                    <Flex 
                        alignItems = 'center' 
                        justifyContent = 'center' 
                        color = '#6f7d93' 
                        marginBottom = '25px' 
                        fontSize = '28px'>Парсинг вакансий</Flex>
                    <Button 
                        onClick = {() => window.location.href = '/vacancies'} 
                        color = '#000' w = '80px' h = '30px' bgColor = '#23243b' 
                        position = 'absolute' 
                        left = '85%' 
                        top = '5px' 
                        isLoading = {loading}
                        _hover = {{bgColor: '#212338'}}>Показать</Button> {/* Кнопка перехода на страницу с отображением */}
                </Flex>
                <SearchInput placeholder = 'Ключевое слово' width = '800px' funct = {setData} title = 'text'></SearchInput>
                <Flex  margin = '20px' h = '50px' w = '750px' alignItems = 'center' justifyContent = 'space-between'> {/* Элемент с первыми выпадающими списками */}
                    {firstMassive.map((el,index) => <DropDownMenu key = {index} convert = {true} title = {el[0][1]}  funct={setData} data = {el[0][0]} list = {el.slice(1)}></DropDownMenu>)}
                </Flex>
                <SalaryInput title = 'salary' subtitle = 'currency' funct = {setData}></SalaryInput>
                <Flex  margin = '20px' h = '50px'  w = '750px' alignItems = 'center' justifyContent = 'space-between'> {/* Элемент со вторыми выпадающими списками */}
                    {secondMassive.map((el,index) =>  <DropDownMenu key = {index} convert = {true} title = {el[0][1]} data = {el[0][0]} funct={setData} list = {el.slice(1)}></DropDownMenu>)}
                </Flex>

                <Button
                    height = '35px'
                    isLoading = {loading}
                    bgColor = "#0b6799"
                    color = 'inherit'
                    transition = '0.3s ease'
                    onClick = {() => updateBd({data, openLoading: openLoading, closeLoading: closeLoading})}
                    _hover={{bgColor: "#085178"}}
                    _active={{bgColor: "#074261"}}
            >Загрузить</Button>
            </DefaultBG>
        </Flex>

    )

}