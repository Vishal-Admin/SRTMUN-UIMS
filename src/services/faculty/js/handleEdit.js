import Axios from 'axios'
import toast from 'react-hot-toast'

function handleEdit(theItem, model, setModal, refresh, setLoading, setIsFormOpen) {

    const url = `${process.env.REACT_APP_MAIN_URL}/api/edit/${model}`

    Axios.post(url, { data: theItem })
        .then((res) => {
            if (res.data.status === 'deleted') {
                refresh()
                toast.success('Item edited successfully')
                setLoading(false)
                setModal(false)
                setIsFormOpen(false)
            }
            else {
                toast.error('Error editing item')
                setLoading(false)
                setModal(false)
                setIsFormOpen(false)
            }
        }).catch((err) => {
            toast.error('Server error')
                setLoading(false)
                setModal(false)
                setIsFormOpen(false)

        })

}

export default handleEdit