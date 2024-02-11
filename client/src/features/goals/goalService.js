import axios from "axios";


const API_URL = 'http://localhost:5000/api/goals/';


axios.defaults.withCredentials = true


//create new goal
const createGoal = async (goalData, token) =>{


    const config = {
        //withCredentials: true,
        //credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, goalData, config).catch((error)=>{console.log(error)});

    return response.data

}

const goalService = {
    createGoal,
}

export default goalService;