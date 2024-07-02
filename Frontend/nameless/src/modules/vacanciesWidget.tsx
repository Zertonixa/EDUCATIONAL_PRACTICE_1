import React from "react";
import { Flex } from "@chakra-ui/react";

import { DefaultBG, SearchInput, DropDownMenu} from "../components/ui/index.ts";
import { BdTable } from "./bdTable.tsx";
import { dataParams } from "../components/maps/params.ts";



const dropdownData = [dataParams.employment, dataParams.test, dataParams.schedule]

const inputData = [["Организация", "name"], ["Роль", "professional_roles"]]


export const VacaniesWidget = () => {


    const [data, setData] = React.useState({name: null, title: null, test: null, url: null, employment: null, salary: null, schedule: null, professional_roles: null})
    

    return(

        <DefaultBG>
            <Flex 
                w = '100%' 
                h = '100%' 
                justifyContent = 'space-between' 
                alignItems = 'center'>
                
                    <BdTable data={Object.fromEntries(Object.entries(data).filter((key) => key[1] !== null))}></BdTable>

                <Flex w = '39.5%' h = '99%' border = '3px solid #191a29' marginRight = '2.5px' borderRadius = '15px' direction = 'column'>
                    <Flex 
                        alignItems = 'center' 
                        justifyContent = 'center' 
                        w = '100%' fontSize = '22px' 
                        h = '50px' 
                        color = '#6f7d93' 
                        borderBottom = '1px solid #191a29'>
                            Фильтры
                    </Flex>
                    <Flex 
                        w = '100%' 
                        h = '70%'
                        marginTop = '50px' 
                        direction = 'column' 
                        alignItems = 'center' 
                        justifyContent = 'space-between'>
                            {inputData.map(el => <SearchInput width = '350px' funct = {setData} title = {el[1]} placeholder = {el[0]} ></SearchInput>)}
                            {dropdownData.map(el => <DropDownMenu convert = {el[0][0] === 'test' ? true : false} title = {el[0][1]} data = {el[0][0]} funct = {setData} list={el.slice(1)}></DropDownMenu>)}
                    </Flex>
                </Flex>
            </Flex>
        </DefaultBG>

    )

}