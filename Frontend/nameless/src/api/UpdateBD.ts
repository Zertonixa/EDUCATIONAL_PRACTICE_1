import axios from 'axios'



interface updateBDProps{
    data: {
        text?: string | null,
        area?: string | null,
        experience?: string | null,
        employment?: string | null,
        schedule?: string | null,
        salary?: object | null
    },
    openLoading: () => void,
    closeLoading: () => void,
}

export const updateBd = async (props: updateBDProps) => {

    props.openLoading()

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

    props.closeLoading()
}