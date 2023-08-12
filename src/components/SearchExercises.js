import React, {  useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { exerciseOptions,fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";


// THIS PROPS WHICH PASSED INTO SEARCHEXERCISES IS COME FROM HOMEPAGE
const SearchExercises = ({setExercises,bodyPart,setBodyPart}) => {

  const [search , setSearch] = useState('');
  const [bodyParts , setBodyParts] = useState([]);

  // THIS FOR FETCHING CATEGORIES 
  useEffect(()=>{
      const fetchExercisesData = async () => {
        const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList' , exerciseOptions);

        setBodyParts(['all' , ...bodyPartsData]);
      }

      fetchExercisesData();
  },[]) // IN USEEFFECT CLOSING , [] WHICH TELLS ZERO DEPENDENCY ARRAY


  const handleSearch = async() => {
    if(search){
      // THIS FETCH THE DATA FROM APIS THAT STORES INTO EXERCISESDATA
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',exerciseOptions);

      // THIS IS FOR SEARCHING THE DATA WHAT USER INPUT INTO SEARCHBOX
        const SearchedExercises = exercisesData.filter(
          (exercise) => exercise.name.toLowerCase().includes(search)
          || exercise.target.toLowerCase().includes(search)
          || exercise.equipment.toLowerCase().includes(search)
          || exercise.bodyPart.toLowerCase().includes(search)
        );
        setSearch(''); // AFTER FETCHING THAT SEARCHBAR VARIABLE EMPTRY FOR WHEN AGAIN  OTHER CAN ENTER THE INPUT
        setExercises(SearchedExercises);
    }
  }


  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase()) }
          placeholder="Search Exercises"
          type="text"
        ></TextField>

        <Button className="search-btn" 
            sx={{
              bgcolor:'#ff2625',
              color:'#fff',
              textTransform:'none',
              width:{lg:'175px' , xs:'80px'},
              fontSize:{lg:'20px' ,xs:'14px'},
              height:'56px',
              position:'absolute',
              right:'0'
            }}  
            onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx = {{position:'relative' , width:'100%' , p:'20px'}}>
        <HorizontalScrollbar data={bodyParts}
          bodyPart = {bodyPart} setBodyPart = {setBodyPart}//THIS IS SELECTED BODY PART WHICH WE OWN CLICKED ON IT 
          isBodyParts
        /> 

      </Box>
    </Stack>
  );
};

export default SearchExercises;
