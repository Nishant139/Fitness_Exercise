import React , {useState , useEffect } from 'react';
import {Box , Stack , Typography} from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { exerciseOptions , fetchData } from '../utils/fetchData';
// ALSO PASS THROUGH PROPS HOME SETEXERCISE,BODYPART,SETBODYPART
import ExerciseCard from './ExerciseCard';

// here setExercise props is ununsed here its used in categories click then show that exercise
const Exercises = ({exercises , setExercises , bodyPart }) => {

    const [currentPage, setcurrentPage] = useState(1);
    const exercisePerPage = 9;

    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;

    const currentExercises  = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginate = (e , value) => { 
        setcurrentPage(value)
        window.scrollTo({top: 1800 , behavior : "smooth"}) 
    }

    useEffect(()=>{
      const fetchExercisesData = async () => {

        let exercisesData = [];

        if(bodyPart ==='all') 
        {
          exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);
        }
        else
        {
          exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
        }
    
        setExercises(exercisesData);
      } 
        fetchExercisesData();
      },[bodyPart]);


  return (
    <Box id = "exercises" 
    sx={{mt:{lg:'110px'}}}
    mt='50px'
    p='20px'

    >
    <Typography variant='h3' mb='46px'>
      Showing result
    </Typography>

    <Stack direction="row" sx={{ gap : { lg:'110px' , xs: '50px'}}}
    flexWrap="wrap" justifyContent="center">
      {currentExercises.map((exercise , index ) => (
       <ExerciseCard key={index} exercise ={exercise} 
       /> // ITS DYNAMIC WHICH CHANGING
      ))}
      
      </Stack>
        <Stack mt="100px" alignItems="center">
            {exercises.length > 9 && (
            <Pagination
              color = "standard"
              shape = "rounded"
              defaultPage = {1}
              count = {Math.ceil(exercises.length / 9)}
              page = {currentPage}
              // onChange={(e)=>paginate(e , value)} this is done behind mui     // pagination function for implementing pagination after that page change
              onChange={paginate}  
              size='large'
            ></Pagination>  
            )}  
        </Stack>

    </Box>
  )
}

export default Exercises
