'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Formik } from 'formik'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const { push } = useRouter()

  useEffect(() => {
    if (localStorage.getItem('qtToken')) {
      push('/')
    }
  }, [])

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
                onSubmit={async (values, { isSubmitting, resetForm }) => {
                  try {
                    const { data } = await axios.post(
                      `${process.env.API_URL}/token`,
                      values
                    )
                    localStorage.setItem('qtToken', data.token)
                    Notify.success('Token gotten successfully')
                    push('/')
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
