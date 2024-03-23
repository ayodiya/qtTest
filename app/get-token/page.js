'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { Formik } from 'formik'

import InputField from '@/components/InputField'
import Button from '@/components/Button'
import getTokenFormValidator, {
  EMAIL,
  EMAIL_LABEL
} from '@/validators/getTokenFormValidator'

const initialValues = {
  [EMAIL]: ''
}

export default function GetToken () {
  return (
    <>
      <Container maxWidth='lg'>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              backgroundColor: 'primary.main',
              width: '300px',
              minHeight: '300px',
              borderRadius: '5px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}
              >
                Get Token
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={getTokenFormValidator}
                // onSubmit={async (values, { isSubmitting, resetForm }) => {

                // }}
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
                          name={EMAIL}
                          error={errors[EMAIL]}
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label={EMAIL_LABEL}
                          placeholder={EMAIL_LABEL}
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
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
