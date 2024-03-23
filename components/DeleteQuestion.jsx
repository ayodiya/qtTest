import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import CancelIcon from '@mui/icons-material/Cancel'

import InputField from '@/components/InputField'
import Button from '@/components/Button'
import addQuestionFormValidator, {
  QUESTION,
  QUESTION_LABEL,
  OPTIONS1,
  OPTIONS1_LABEL,
  OPTIONS2,
  OPTIONS2_LABEL,
  OPTIONS3,
  OPTIONS3_LABEL,
  OPTIONS4,
  OPTIONS4_LABEL,
  OPTIONS5,
  OPTIONS5_LABEL
} from '@/validators/addQuestionFormValidator'

export default function EditQuestionDialog ({
  handleDelQuestDialogOpen,
  openDelQuestDialog,
  delQuestion
}) {
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
            text='Yes'
            variant='contained'
            backgroundColor='primary.main'
          />
        </Box>
      </Stack>
    </Dialog>
  )
}
