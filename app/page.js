'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import questionExamples from '@/utils/questionExamples'
import Button from '@/components/Button'
import AddQuestionDialog from '@/components/AddQuestionDialog'
import EditQuestionDialog from '@/components/EditQuestionDialog'
import DeleteQuestion from '@/components/DeleteQuestion'

const indexToLetter = index => {
  return String.fromCharCode(65 + index)
}

export default function Home () {
  const [questions, setQuestions] = useState({})
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDelQuestDialog, setOpenDelQuestDialog] = useState(false)
  const [editQuestion, setEditQuestion] = useState('')
  const [delQuestion, setDelQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleAddDialogOpen = () => setOpenAddDialog(!openAddDialog)
  const handleEditDialogOpen = () => setOpenEditDialog(!openEditDialog)
  const handleDelQuestDialogOpen = () =>
    setOpenDelQuestDialog(!openDelQuestDialog)

  const getQuestions = async (req, res) => {
    setLoading(true)

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/questions`,
        {
          headers: {
            Token: localStorage.getItem('qtToken'),
            'Content-Type': 'application/json'
          }
        }
      )
      if (data === null) {
        setQuestions({})
      } else {
        setQuestions(data)
      }
    } catch (error) {
      Notify.failure('Server error, please try again')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (localStorage.getItem('qtToken') === null) {
      push('/get-token')
    }
    getQuestions()
  }, [])

  return (
    <>
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
              onClick={handleAddDialogOpen}
              backgroundColor='secondary.main'
              text='Add question'
              color='white'
              fontSize='16px'
              width={{ xs: '40%', md: '15%' }}
              variant='contained'
            />
          </Box>

          {Object.entries(questions).length === 0 && loading && (
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
              <Box>Loading</Box>
            </Box>
          )}
          {Object.entries(questions).length === 0 && !loading && (
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
          {Object.entries(questions).length > 0 && !loading && (
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
                  {Object.entries(questions).map(([key, value], index) => (
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
                            onClick={() => {
                              handleEditDialogOpen()
                              setEditQuestion(Object.entries(questions)[index])
                            }}
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
                            onClick={() => {
                              handleDelQuestDialogOpen()
                              setDelQuestion(
                                Object.entries(questions)[index][0]
                              )
                            }}
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
                            <Stack
                              sx={{
                                display: option === '' ? 'none' : 'flex'
                              }}
                              direction='row'
                              key={index}
                              spacing={1}
                            >
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
          )}
        </Container>
      </Box>
      <AddQuestionDialog
        handleAddDialogOpen={handleAddDialogOpen}
        openAddDialog={openAddDialog}
        getQuestions={getQuestions}
      />
      <EditQuestionDialog
        handleEditDialogOpen={handleEditDialogOpen}
        openEditDialog={openEditDialog}
        editQuestion={editQuestion}
        getQuestions={getQuestions}
      />
      <DeleteQuestion
        handleDelQuestDialogOpen={handleDelQuestDialogOpen}
        openDelQuestDialog={openDelQuestDialog}
        delQuestion={delQuestion}
        getQuestions={getQuestions}
      />
    </>
  )
}
