import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {

  //THIS IS BECAUSE IN HOMEPAGES BECAUSE THEIRE CHANGES NOT ONLY IN SEARCHEXERCISE 
  const [bodyPart, setBodyPart] = useState('all')
  const [exercises,setExercises] = useState([]);

  console.log(bodyPart);

  return (
    <div>
      <HeroBanner/>
      <SearchExercises 
      setExercises={setExercises}
      bodyPart={bodyPart}
      setBodyPart={setBodyPart}
      />
{/*BOTH OF THEM SHARED SAME STATE AND IF DON'T LIKE TO  FILL ALL OF THESE ALSO USE REACT CONTEXT API  */}
      <Exercises
      exercises={exercises}
      setExercises={setExercises}
      bodyPart={bodyPart}
      />
    </div>
  )
}

export default Home
