import Button from '@mui/material/Button'
import PropTypes from 'prop-types'

export default function ButtonCom ({
  backgroundColor,
  text,
  borderRadius,
  color,
  fontSize,
  width,
  borderColor,
  variant,
  height,
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
        height,
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

ButtonCom.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
