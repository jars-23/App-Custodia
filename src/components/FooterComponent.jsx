import { Box, Typography } from "@mui/material";

const FooterComponent = () => {
  return (
    <Box sx={{ textAlign: "center", p: 2, backgroundColor: "#002d7c", color: "white" }}>
      <Typography variant="body2">© 2025 Mi Sitio. Todos los derechos reservados.</Typography>
    </Box>
  );
};

export default FooterComponent;