import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function InputField ({
  name,
  error,
  type,
  onBlur,
  onChange,
  email,
  label,
  accept,
  placeholder,
  ...props
}) {
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <TextField
        sx={{
          '& .MuiInputBase-input': {
            backgroundColor: 'white',
            borderRadius: '5px'
          }
        }}
        InputLabelProps={{
          style: { color: 'black' }
        }}
        accept={accept}
        type={type}
        name={name}
        error={error !== undefined}
        fullWidth
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        variant='outlined'
        {...props}
      />
      <Box
        sx={{
          color: 'red',
          paddingTop: '6px',
          fontSize: '11px'
        }}
      >
        {error}
      </Box>
    </Box>
  )
}
