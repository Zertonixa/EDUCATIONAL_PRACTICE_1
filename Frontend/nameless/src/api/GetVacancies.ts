import axios from "axios";



export interface dataProps{
    name: string,
    title: string,
    test: boolean,
    url: string,
    employment: string,
    salary: string,
    schedule: string,
    professional_roles: string
}

let data: dataProps[]

export const getVacanciesAPI = async () => {

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

    return data

}