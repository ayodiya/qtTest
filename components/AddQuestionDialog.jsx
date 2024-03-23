import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel'
import { Formik } from 'formik'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

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

const initialValues = {
  [QUESTION]: '',
  [OPTIONS1]: '',
  [OPTIONS2]: '',
  [OPTIONS3]: '',
  [OPTIONS4]: '',
  [OPTIONS5]: ''
}

export default function AddQuestionDialog ({
  openAddDialog,
  getQuestions,
  handleAddDialogOpen
}) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '500px',
          padding: '25px'
        }
      }}
      onClose={handleAddDialogOpen}
      open={openAddDialog}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <CancelIcon onClick={handleAddDialogOpen} sx={{ cursor: 'pointer' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <DialogTitle>Add question</DialogTitle>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={addQuestionFormValidator}
        onSubmit={async (values, { isSubmitting, resetForm }) => {
          try {
            const dataToSubmit = {
              question: values[QUESTION],
              options: [
                values[OPTIONS1],
                values[OPTIONS2],
                values[OPTIONS3],
                values[OPTIONS4],
                values[OPTIONS5]
              ]
            }
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/questions`,
              dataToSubmit,
              {
                headers: {
                  Token: localStorage.getItem('qtToken'),
                  'Content-Type': 'application/json'
                }
              }
            )

            Notify.success('Question added successfully')
            handleAddDialogOpen()
            getQuestions()
          } catch (error) {
            Notify.failure('Server error, please try again')
          }

          resetForm()
        }}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          isSubmitting,
          handleBlur,
          values
        }) => (
          <Box
            onSubmit={handleSubmit}
            component='form'
            sx={{
              paddingTop: '40px',
              width: '100%'
            }}
          >
            <Stack spacing={2} sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={QUESTION}
                  error={errors[QUESTION]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={QUESTION_LABEL}
                  placeholder={QUESTION_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={OPTIONS1}
                  error={errors[OPTIONS1]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={OPTIONS1_LABEL}
                  placeholder={OPTIONS1_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={OPTIONS2}
                  error={errors[OPTIONS2]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={OPTIONS2_LABEL}
                  placeholder={OPTIONS2_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={OPTIONS3}
                  error={errors[OPTIONS3]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={OPTIONS3_LABEL}
                  placeholder={OPTIONS3_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={OPTIONS4}
                  error={errors[OPTIONS4]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={OPTIONS4_LABEL}
                  placeholder={OPTIONS4_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <InputField
                  name={OPTIONS5}
                  error={errors[OPTIONS5]}
                  type='text'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label={OPTIONS5_LABEL}
                  placeholder={OPTIONS5_LABEL}
                />
              </Box>
              <Box
                sx={{
                  display: { md: 'flex' },
                  justifyContent: { md: 'center' },
                  width: { md: '100%' }
                }}
              >
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  backgroundColor='secondary.main'
                  text={isSubmitting ? <CircularProgress /> : 'Submit'}
                  color='white'
                  fontSize='16px'
                  width={{ xs: '100%', md: '35%' }}
                  variant='contained'
                />
              </Box>
            </Stack>
          </Box>
        )}
      </Formik>
    </Dialog>
  )
}
