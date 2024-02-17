import React from "react";
import Button from "@mui/material/Button";
import _Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface DialogProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  options?: {
    withOutHeader?: boolean;
    withoutFooter?: boolean;
  };
}

const Dialog = ({
  isOpen,
  onClose,
  onSubmit,
  children,
  options,
}: DialogProps) => {
  return (
    <_Dialog open={isOpen}>
      {!options?.withOutHeader && <DialogTitle>Dialog Title</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {!options?.withoutFooter && (
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      )}
    </_Dialog>
  );
};

export default Dialog;
