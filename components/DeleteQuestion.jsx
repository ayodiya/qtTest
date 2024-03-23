'use client'

import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useState } from 'react'

import CancelIcon from '@mui/icons-material/Cancel'
import Button from '@/components/Button'

export default function DeleteQuestionDialog ({
  handleDelQuestDialogOpen,
  openDelQuestDialog,
  getQuestions,
  delQuestion
}) {
  const [loading, setLoading] = useState(false)

  const handleDelQuest = async () => {
    setLoading(true)

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/questions/${delQuestion}`,
        {
          headers: {
            Token: localStorage.getItem('qtToken'),
            'Content-Type': 'application/json'
          }
        }
      )

      Notify.success('Question deleted successfully')
      handleDelQuestDialogOpen()
      getQuestions()
    } catch (error) {
      console.log('this is error', error)
      Notify.failure('Server error, please try again')
    }
    setLoading(false)
  }

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '500px',
          padding: '25px'
        }
      }}
      onClose={handleDelQuestDialogOpen}
      open={openDelQuestDialog}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <CancelIcon
          onClick={handleDelQuestDialogOpen}
          sx={{ cursor: 'pointer' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <DialogTitle>Edit question</DialogTitle>
      </Box>
      <Box>Are you sure you want to delete the question?</Box>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          paddingTop: '20px'
        }}
      >
        <Box>
          <Button
            onClick={openDelQuestDialog}
            text='No'
            variant='contained'
            backgroundColor='dangerColor.main'
          />
        </Box>
        <Box>
          <Button
            onClick={() => handleDelQuest()}
            text={loading ? <CircularProgress /> : 'Yes'}
            variant='contained'
            backgroundColor='primary.main'
          />
        </Box>
      </Stack>
    </Dialog>
  )
}
