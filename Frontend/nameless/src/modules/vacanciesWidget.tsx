import React, { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { DefaultBG, VacancyCard, SearchInput, DropDownMenu} from "../components/ui/index.ts";
import { dataParams } from "../components/maps/params.ts";

import { getVacanciesAPI } from "../api/GetVacancies.ts";

import { dataProps } from "../api/GetVacancies.ts";


const dropdownData = [dataParams.employment, dataParams.test, dataParams.schedule]

const inputData = [["Организация", "name"], ["Роль", "professional_roles"]]

const filter = (data1, data2) => {
    var f = true
    Object.keys(data2).map(el => (data2[el] !== null && data2[el] !== '') ? (data1[el].toLowerCase().includes(data2[el].toLowerCase()) ? 1 : f = false) : 1)
    return f
  }

export const VacaniesWidget = () => {

    const [vacancies, setVacancies] = React.useState<dataProps[]>([])

    const [count, setCount] = React.useState(4)

    const [filtered, setFiltered] = React.useState<dataProps[]>([]);

    const [data, setData] = React.useState({name: null, title: null, test: null, url: null, employment: null, salary: null, schedule: null, professional_roles: null})
    
    useEffect(() => {

          setFiltered(vacancies.filter((vacancy) => filter(vacancy, data)))
          
        },[vacancies, data])

        
    useEffect(() => {
        
        getVacanciesAPI().then(result => setVacancies(result))

    }, [])

    return(

        <DefaultBG>
            <Flex w = '100%' h = '100%' justifyContent = 'space-between' alignItems = 'center'>
                <Flex w = '59.5%' h = '99%' border = '3px solid #191a29' borderRadius = '15px' marginLeft = '5px' direction = 'column'>
                    <Flex  w = '100%' borderBottom = '2px solid  #191a29' h = '50px' alignItems = 'center' justifyContent = 'center' color = '#6f7d93' fontSize = '20px'>Список вакансий</Flex>
                    <Flex w = '100%' direction = 'column' h = '100%' overflowY = 'scroll' >
                        {vacancies[0] !== undefined ? filtered.slice(0,count).map(vacancy => <VacancyCard data = {vacancy}></VacancyCard>) : "Загружаем"}
                        <Flex  alignItems = 'center' justifyContent = 'center'>
                            {count < filtered.length ? <Button w = '120px' h = '40px' onClick = {() => setCount(count + 5)}>Загурзить ещё</Button> : ''}
                        </Flex>
                    </Flex>
                </Flex>

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
                            {dropdownData.map(el => <DropDownMenu convert = {false} title = {el[0][1]} data = {el[0][0]} funct = {setData} list={el.slice(1)}></DropDownMenu>)}
                    </Flex>
                </Flex>
            </Flex>
        </DefaultBG>

    )

}