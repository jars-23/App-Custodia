import { createTheme } from "@mui/material/styles";
import { borderRadius, darken, margin } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1.1rem",
          borderRadius: "30px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px 0px",
          transition: "background-color 0.3s ease",
          "&.Mui-disabled": {
            backgroundColor: "#2c3340",
            color: "#ffffff",
          },
        },
        containedPrimary: {
          backgroundColor: "#002d7c",
          "&:hover": {
            backgroundColor: darken("#002d7c", 0.2),
          },
        },
        containedSecondary: {
          backgroundColor: "#2168da",
          "&:hover": {
            backgroundColor: darken("#2168da", 0.2),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          backgroundColor: "#f2f2f2",
          color: "#333",
          fontSize: "14px",
          borderRadius: "0 0 10px 10px"
        },
        select: {
          border: "1px solid #c5c5c5",
          backgroundColor: "#fff",
          borderRadius: "10px",
          color: "#333",
          fontSize: "15px",
          paddingTop: "8px"
        },
        displayedRows: {
          fontWeight: "400",
          fontSize: "14px",
        },
        actions: {
          "& svg": {
            color: "#002d7c",            
            fontSize: "20px",
          },
        }
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          backgroundColor: '#fff',
          width: '550px',
          overflow: 'hidden'
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 250,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#002d7c",
    },
    secondary: {
      main: "#2168da",
    },
  },
});

export default theme;