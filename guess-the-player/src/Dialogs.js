import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

const Dialogs = ({
  openModal,
  counter,
  points,
  selectedPlayer,
  handleClose,
}) => {
  return (
    <Dialog open={openModal} onClose={handleClose}>
      <DialogTitle>
        {counter === 4
          ? `Parabéns! O jogo acabou. Pontuação: ${points}`
          : `Acertou! O jogador era o ${selectedPlayer}`}
      </DialogTitle>
    </Dialog>
  );
};

export default Dialogs;
