import { Button, CircularProgress } from "@mui/material"

export const SubmitButton = ({text, isSubmitting, isValid}) => {
    return (
        <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
        {text}
      </Button>
    )
}