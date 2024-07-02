import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { VacancyCard, HollowBDTable } from "../components/ui/index.ts";

import { TfiReload } from "react-icons/tfi";

import { dataProps } from "../api/GetVacancies.ts";

import { getVacanciesAPI } from "../api/GetVacancies.ts";



interface ItemProps{
    name?: string,
    title?: string,
    test?: string,
    url?: string,
    employment?: string,
    salary?: string,
    schedule?: string,
    professional_roles?: string
}

interface BdTableProps{
    data: ItemProps
}



const filter = (data1, data2) => {
    var f = true
    Object.keys(data2).map(el => (data2[el] !== null && data2[el] !== '') ? (data1[el].toLowerCase().includes(data2[el].toLowerCase()) ? 1 : f = false) : 1)
    return f
  }

export const BdTable = (props: BdTableProps) => {

    const [vacancies, setVacancies] = React.useState<dataProps[]>([])

    const [loading, setLoading] = React.useState(false)
    const openLoading = () => {setLoading(true)}
    const closeLoading = () => {setLoading(false)}

    const [count, setCount] = React.useState(4)

    const [filtered, setFiltered] = React.useState<dataProps[]>([]);

    React.useEffect(() => {

            vacancies !== undefined ?  setFiltered(vacancies.filter((vacancy) => filter(vacancy, props.data))) : console.log('БД лягла')
            
          
        },[vacancies, props.data])
    
    
    React.useEffect(() => {
        
        getVacanciesAPI({openLoading: openLoading, closeLoading: closeLoading}).then(result => setVacancies(result))

    }, [])


    return(
            <Flex 
                w = '59.5%' 
                h = '99%' 
                border = '3px solid #191a29' 
                borderRadius = '15px' 
                marginLeft = '5px' 
                direction = 'column'>
                    <Flex  
                        w = '100%' 
                        borderBottom = '2px solid  #191a29' 
                        h = '50px' 
                        alignItems = 'center' 
                        justifyContent = 'center' 
                        color = '#6f7d93' 
                        fontSize = '20px'
                        position = 'relative'>
                            Список вакансий
                            <Flex 
                                bgColor = '#1d2838' 
                                w = '30px' 
                                h ='30px' 
                                borderRadius = '5px'
                                alignItems = 'center'
                                justifyContent = 'center'
                                transition = '0.2s ease'
                                _hover = {{bgColor: '#1c2636', cursor: 'pointer'}}
                                position = 'absolute'
                                left = '93%'
                                onClick = {() => {setVacancies([]);getVacanciesAPI({openLoading: openLoading, closeLoading: closeLoading}).then(result => setVacancies(result))}} /*В ивент лупе промис идёт позже => переделать кнопку*/
                                ><TfiReload size = {20}></TfiReload></Flex>
                    </Flex>
                        
        {vacancies !== undefined ? (<Flex w = '100%' direction = 'column' h = '100%' overflowY = 'scroll' >
            
                                        {!loading ? (vacancies.length > 0 ? filtered.slice(0,count).map(vacancy => <VacancyCard data = {vacancy}></VacancyCard>) : <HollowBDTable></HollowBDTable>)
                                        :<Flex h = '100%' alignItems = 'center' justifyContent = 'center' fontSize = '24px' color = '#6f7d93'>Загружаем</Flex>}

                                         <Flex h = '100px' alignItems = 'center' justifyContent = 'center'>
                                            {count < filtered.length ? <Button 
                                                                            color = '#000' 
                                                                            bgColor = '#23243b' 
                                                                            w = '120px' 
                                                                            h = '40px' 
                                                                            _hover = {{bgColor: '#212338'}}
                                                                            onClick = {() => {setCount(count + 5);console.log(filtered) }}>Загурзить ещё</Button> : ''}
                                        </Flex>

                                    </Flex>)

        : <Flex 
            w = '100%' 
            h = '100%' 
            alignItems = 'center' 
            justifyContent = 'center' 
            color = '#6f7d93' 
            fontSize = '24px'>Не удается установить соединение с сервером</Flex>
        }
        </Flex>
    )

}