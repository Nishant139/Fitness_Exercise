import React , {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'


import {exerciseOptions , fetchData, youtubeOptions} from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';


const ExerciseDetail = () => {

  const [exerciseDetail, setExerciseDetail] = useState({});
  const {id}  = useParams(); // give access of exercise when click on exercise then that index on url
  const [exerciseVideos, setExerciseVideos] = useState([]);  // this inside passed array
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);  // this function calls inside useEffect
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      // exerciseDetailData this func call APIs where {id} of {exerciseDbUrl} passes
      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}` , exerciseOptions)
      console.log({exerciseDetailData});
      setExerciseDetail(exerciseDetailData);

      // SECOND API CALLS
      const ExerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}` , youtubeOptions);

      setExerciseVideos(ExerciseVideosData.contents) // function call


      // it is for similar exercise data what it shows likes similar exercises (only using of api link of that diffrent pages not use of any high-Algorithm)
      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}` , exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}` , exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);

    }

    fetchExerciseData();

  }, [id])
  // on dependency array "id" so that callback function called when id is changed
  

  return (
    <Box>
      <Detail exerciseDetail = {exerciseDetail}></Detail>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}></ExerciseVideos>
      <SimilarExercises targetMuscleExercises = {targetMuscleExercises} equipmentExercises = {equipmentExercises}></SimilarExercises>
    </Box>
  )
}

export default ExerciseDetail
