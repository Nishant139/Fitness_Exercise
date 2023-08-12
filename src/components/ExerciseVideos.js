import React from 'react'
import {Box , Stack , Typography} from '@mui/material'


const ExerciseVideos = ({exerciseVideos , name}) => {

  if(!exerciseVideos.length) return 'Loading...'

  return (
    <Box sx={{marginTop:{lg : '200px' , xs: '20px'}}} p = '20px'>
      <Typography variant='h3' mb='33px'>
        Watch<span style={{color:'#ff2625' , textTransform:'capitalize'}}> {name} </span>exercise videos
      </Typography>
      <Stack justifyContent="flex-start" flexWrap='wrap' alignItems="center" sx={{
        flexDirection:{lg: 'row'}, gap: {lg : '110px' , xs : '0'}
      }}
      >
        {/* here in slice watching number of videos   and   exerciseVideos? means is actually exist?  */}
        {exerciseVideos?.slice(0,6).map((item , index)=> (
          // that video is link so that it is in a tag
          <a
          key={index}
          className='exercise-video'
          href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
          target='_blank'
          rel='noreferrer'
          >
            {/* even photo acts as a link */}
            <img src={item.video.thumbnails[0].url} alt={item.video.title}></img>
            <Box>
              <Typography variant='h5' color='#000'>
                {item.video.title}
              </Typography>
              <Typography variant='h6' color='#000'>
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  )
}

export default ExerciseVideos