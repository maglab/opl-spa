import axios from "axios"
import { detailsActions } from "../../../state/Details/detailsSlice";
const submit = async (data, dispatch) => {
    const openProblemId = data.openProblem
    const date = new Date();
    const requestData = {
        full_text: data.description,
        date: date,
        first_name: data.firstName, 
        last_name: data.lastName, 
        affiliation: data.affiliation,
        open_problem: openProblemId, 
        submitted_references: JSON.stringify({...data.references}), 
        is_active: false,
    }
    try{
        const response = await axios.post(`${process.env.REACT_APP_GET_SUBMISSION_ENDPOINT}/${openProblemId}/submit`, requestData); 
        if(response.status == 201){
            dispatch(detailsActions.toggleModalOpen())
            dispatch(detailsActions.setSubmitState({title:"Post submitted" ,message:"This post has been submitted for review", status:"success"}))
        }
    }catch(error){
        dispatch(detailsActions.toggleModalOpen())
        dispatch(detailsActions.setSubmitState({title:"Unsuccessful submission", message:`${error.message}`, status:"failed"}))

    }
} 

export default submit