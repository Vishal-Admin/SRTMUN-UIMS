import axios from "axios";

const getDepartmentWiseDocumentCount = ({ model, setState, property }) => {
    axios.post(`${process.env.REACT_APP_MAIN_URL}/getDepartmentWiseDocumentCount`,
        { model, property }).then(response => {
            console.log(response.data)
            setState(response.data)
        }).catch(error => {console.error(error)});
};
export default getDepartmentWiseDocumentCount;