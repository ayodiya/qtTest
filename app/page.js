import Image from 'next/image'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import questionExamples from '@/utils/questionExamples'
import Button from '@/components/Button'

const indexToLetter = index => {
  return String.fromCharCode(65 + index)
}

export default function Home () {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        paddingBottom: '100px'
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            paddingTop: '50px',
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' }
          }}
        >
          <Button
            backgroundColor='secondary.main'
            text='Add question'
            color='white'
            fontSize='16px'
            width={{ xs: '40%', md: '15%' }}
            variant='contained'
          />
        </Box>
        {Object.entries(questionExamples).length < 1 && (
          <Box
            sx={{
              minHeight: '250px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              fontWeight: 700
            }}
          >
            <Box>No question currently available</Box>
          </Box>
        )}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 700,
              paddingTop: { xs: '40px' },
              paddingBottom: { xs: '40px' }
            }}
          >
            Questions
          </Box>
          <Box
            sx={{
              paddingTop: '30px'
            }}
          >
            <Stack spacing={4}>
              {Object.entries(questionExamples).map(([key, value], index) => (
                <Box key={index}>
                  <Stack
                    sx={{
                      paddingLeft: '10px'
                    }}
                    direction='row'
                    spacing={1}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: 'questionColor.main',
                        fontWeight: 900,
                        alignItems: 'center',
                        fontSize: '20px'
                      }}
                    >
                      {index + 1}.
                    </Box>
                    <Box
                      sx={{
                        alignSelf: 'center',
                        color: 'questionColor.main',
                        fontSize: '20px',
                        fontWeight: 900
                      }}
                    >
                      {value.question}
                    </Box>
                    <Box
                      sx={{
                        alignSelf: 'center'
                      }}
                    >
                      <Button
                        height='20px'
                        text='Edit'
                        variant='outlined'
                        color='primary.main'
                        borderColor='primary.main'
                      />
                    </Box>
                    <Box
                      sx={{
                        alignSelf: 'center'
                      }}
                    >
                      <Button
                        height='20px'
                        text='Delete'
                        variant='outlined'
                        borderColor='dangerColor.main'
                        color='dangerColor.main'
                      />
                    </Box>
                  </Stack>
                  <Box
                    sx={{
                      paddingTop: '20px'
                    }}
                  >
                    <Stack spacing={1}>
                      {value.options.map((option, index) => (
                        <Stack direction='row' key={index} spacing={1}>
                          <Box
                            sx={{
                              border: '2px solid #4056a1',
                              height: { xs: '35px', md: '25px' },
                              width: { xs: '35px', md: '25px' },
                              display: 'flex',
                              justifyContent: 'center',
                              borderRadius: '4px',
                              color: 'questionColor.main',
                              fontWeight: 900,
                              alignItems: 'center',
                              fontSize: { xs: '20px', md: '15px' }
                            }}
                          >{`${indexToLetter(index)}`}</Box>
                          <Box
                            sx={{
                              alignSelf: 'center'
                            }}
                          >
                            {option}
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
