import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import axios from 'axios'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'
import CancelIcon from '@mui/icons-material/Cancel'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Formik } from 'formik'

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
  openEditDialog,
  handleEditDialogOpen,
  editQuestion,
  getQuestions
}) {
  console.log('this is editQuestion', editQuestion)

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '500px',
          padding: '25px'
        }
      }}
      onClose={handleEditDialogOpen}
      open={openEditDialog}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <CancelIcon onClick={handleEditDialogOpen} sx={{ cursor: 'pointer' }} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <DialogTitle>Edit question</DialogTitle>
      </Box>
      <Formik
        initialValues={{
          [QUESTION]: editQuestion[1]?.question,
          [OPTIONS1]: editQuestion[1]?.options[0],
          [OPTIONS2]: editQuestion[1]?.options[1],
          [OPTIONS3]: editQuestion[1]?.options[2],
          [OPTIONS4]: editQuestion[1]?.options[3],
          [OPTIONS5]: editQuestion[1]?.options[4]
        }}
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
            await axios.put(
              `${process.env.NEXT_PUBLIC_API_URL}/questions/${editQuestion[0]}`,
              dataToSubmit,
              {
                headers: {
                  Token: localStorage.getItem('qtToken'),
                  'Content-Type': 'application/json'
                }
              }
            )

            Notify.success('Question edited successfully')
            handleEditDialogOpen()
            getQuestions()
          } catch (error) {
            Notify.failure('Server error, please try again')
          }
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
                  value={values[QUESTION]}
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
                  value={values[OPTIONS1]}
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
                  value={values[OPTIONS2]}
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
                  value={values[OPTIONS3]}
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
                  value={values[OPTIONS4]}
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
                  value={values[OPTIONS5]}
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

EditQuestionDialog.propTypes = {
  openEditDialog: PropTypes.func.isRequired,
  handleEditDialogOpen: PropTypes.func.isRequired,
  editQuestion: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string, // Expects a string
      PropTypes.shape({
        options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired // Expects an object with options (array of strings) property
      })
    ])
  ).isRequired,
  getQuestions: PropTypes.func.isRequired
}
