import Stack from "@mui/material/Stack";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import Typography from "@mui/material/Typography";

const Header = ({ points }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
      sx={{ py: 2 }}
    >
      <EmojiEventsOutlinedIcon size="" />
      <Typography variant="h5">Pontuação: {points}</Typography>
    </Stack>
  );
};

export default Header;
