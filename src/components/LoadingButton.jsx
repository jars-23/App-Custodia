import { Button, CircularProgress } from "@mui/material";

const LoadingButton = ({ children, type = "submit", loading, textLoading = "Ingresando...", ...props }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      type={type}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={18} sx={{ color: "white", marginRight: "10px" }} />
          {textLoading} 
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
