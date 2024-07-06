import axios from "axios";

interface getVacanciesAPIProps{
    openLoading: () => void,
    closeLoading: () => void,
}

export interface dataProps{
    name: string,
    title: string,
    test: string,
    url: string,
    employment: string,
    salary: string,
    schedule: string,
    professional_roles: string
}



let data: dataProps[]

export const getVacanciesAPI = async (props: getVacanciesAPIProps) => {

    props.openLoading()

    await axios.get('http://127.0.0.1:8000/vacancies/take-vacancies', {
    })
    .then(response => {
        console.log(response)
        if (response.status === 200) return(
            data = response.data
        )
    })

    .catch(error => {
        console.log(error)
    })

    console.log(data)
    props.closeLoading()
    return data

}