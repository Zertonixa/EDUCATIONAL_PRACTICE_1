import axios from 'axios'



interface updateBDProps{
    data: {
        text?: string,
        area?: string,
        experience?: string,
        employment?: string,
        schedule?: string,
        salary?: string
    }
}

export const updateBD = async (props: updateBDProps) => {

    await axios.post('http://127.0.0.1:8000/vacancies/update_db', {
        text: props.data.text,
        area: props.data.area,
        experince: props.data.area,
        employment: props.data.employment,
        schedule: props.data.schedule,
        salary: props.data.salary
    })
    .then(response => {
        console.log(response)
        if (response.status === 201) return
        console.log('Success')
    })

    .catch(error => {
        console.log(error)
    })
}