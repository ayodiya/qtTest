import Button from '@mui/material/Button'

export default function ButtonCom ({
  backgroundColor,
  text,
  borderRadius,
  color,
  fontSize,
  width,
  borderColor,
  variant,
  type,
  ...props
}) {
  return (
    <Button
      {...props}
      type={type}
      disableRipple
      disableElevation
      variant={variant}
      sx={{
        width,
        borderRadius,
        borderColor,
        color,
        fontSize,
        textTransform: 'none',
        padding: '10px 20px',
        backgroundColor,
        '&:hover': {
          color,
          backgroundColor,
          borderColor
        }
      }}
    >
      {text}
    </Button>
  )
}
