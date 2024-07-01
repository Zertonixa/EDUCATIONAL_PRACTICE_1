import React from "react";
import { Flex} from "@chakra-ui/react";

import { SearchInput, DropDownMenu, DefaultBG, SalaryInput } from "../components/ui/index.ts";

import { updateBd } from "../api/UpdateBD.ts";
import { Button } from "@chakra-ui/react";

import { dataParams } from "../components/maps/params.ts";


const firstMassive = [dataParams.area, dataParams.employment]

const secondMassive = [dataParams.experience, dataParams.schedule]


export const UpdateWidget = () => {

    const [data, setData] = React.useState({salary: null, text: null, area: null, experience: null, employment: null, schedule: null, currency: null,})

    return(

        <Flex>
            <DefaultBG>
                <Flex color = ''></Flex>
                <SearchInput placeholder = 'Ключевое слово' width = '800px' funct = {setData} title = 'text'></SearchInput>
                <Flex  margin = '20px' h = '50px' w = '750px' alignItems = 'center' justifyContent = 'space-between'>
                    {firstMassive.map(el => <DropDownMenu convert = {true} title = {el[0][1]}  funct={setData} data = {el[0][0]} list = {el.slice(1)}></DropDownMenu>)}
                </Flex>
                <SalaryInput title = 'salary' subtitle = 'currency' funct = {setData}></SalaryInput>
                <Flex  margin = '20px' h = '50px'  w = '750px' alignItems = 'center' justifyContent = 'space-between'>
                    {secondMassive.map(el =>  <DropDownMenu convert = {true} title = {el[0][1]} data = {el[0][0]} funct={setData} list = {el.slice(1)}></DropDownMenu>)}
                </Flex>

                <Button
                    height = '35px'
                    isLoading = {false}
                    bgColor = "#0b6799"
                    color = 'inherit'
                    transition = '0.3s ease'
                    onClick = {() => updateBd({data})}
                    _hover={{bgColor: "#085178"}}
                    _active={{bgColor: "#074261"}}
            >Загрузить</Button>
            </DefaultBG>
        </Flex>

    )

}