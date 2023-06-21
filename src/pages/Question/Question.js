import {Fragment} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { questionActions } from '../../state/Question/questionSlice';
import ModalContent from './QuestionsInterface/ModalContent';
import Statbar from './Statbar/Statbar';
import axios from 'axios'
import './Question.css'
import {ModalT} from '../../components/UI/Modal/Modal'; 
import SearchBar from './SearchBar/SearchBar';
import QuestionInterface from './QuestionsInterface/QuestionsInterface';
require('dotenv').config()


function Question(){
    const modalState = useSelector(state => state.question.modalOpen)
    const questionDetails = useSelector(state => state.question.modalDetails)
    const dispatch = useDispatch()
    const modalCloseHandler = () =>{dispatch(questionActions.toggleModalClose())}
    return(
    <Fragment>
        <div className='text-center py-2 pb-6 text-sm md:text-lg'>
            <p><strong>This is our initial selection of high level open questions in longevity and ageing science. We invite you to submit your questions to help us improve our database, classify questions and to develop an ontology for these question.</strong> </p>
        </div>
        <div>
        <p className='text-sm md:text-base'> If you want to add a question that falls under the high-level questions provided, select the question and click submit question. Otherwise use the submit question button in the bar below.</p>

        </div>
        <SearchBar/>
        <Statbar className='statbar'/>
        <QuestionInterface/>
        <ModalT open={modalState} close={modalCloseHandler}>
            <ModalContent questionDetails={questionDetails} close={modalCloseHandler}/>
        </ModalT>


    </Fragment>

)
}




export default Question; 
export async function loader(){
    const {data:recursiveData} = await axios.get(`http://${process.env.DB_REQUEST}:8000/questions/root`)
    const {data} = await axios.get(`http://${process.env.DB_REQUEST}:8000/questions/`)
    return {recursiveData, data}
}