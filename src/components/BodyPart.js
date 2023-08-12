import React from 'react'
import { Stack,Typography } from '@mui/material'

import Icon from '../assets/icons/gym.png'

// THIS PASS TO THE HORIZONTALSCROLL BAR  FILE IN PROPS THAT FETCH FROM PRINT EVERY TIME USING MAP
const BodyPart = ({ item,setBodyPart , bodyPart }) => {
  return (
   <Stack
    type = "button"
    alignItems='center'
    justifyContent="center"
    className='bodyPart-card'
    sx={{
        borderTop: bodyPart === item ? '4px solid #ff2625' : '' ,   
        backgroundColor : '#fff',
        borderBottomLeftRadius:'20px',
        width:'270px',
        height:'280px',
        cursor:'pointer',
        gap:'47px'
    }}
      onClick = {() =>{
        setBodyPart(item); // this is coming from the horizontalScrollBar props. and that bodyPart called in searchExercise.
        window.scrollTo({top:1800,left:100,behavior:'smooth'})
      }}
   >
    <img src={Icon} alt='dumbbell' style={{width:'40px', height:'40px'}}
    />
    <Typography fontSize='24px' fontWeight='bold' color='#3A1212' textTransform='capitalize'>{item}</Typography>
   </Stack>
  )
}

export default BodyPart