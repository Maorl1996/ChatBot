import Dialog from "components/Dialog/Dialog";
import React, { useState } from "react";
// @ts-ignore
import styles from "./LoginDialog.module.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleClick = () => {
    // Set data to localStorage
    if (!name) {
      setError("Please enter your name");
      return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userId", uuidv4());
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      options={{ withOutHeader: true, withoutFooter: true }}
    >
      <div className={styles.content}>
        <TextField
          label="What's your name?"
          variant="outlined"
          onChange={(e) => {
            setName(e.target.value);
          }}
          error={!!error}
          helperText={error ? "Name cannot be empty" : ""}
        />
        <Button onClick={handleClick} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </Dialog>
  );
};

export default LoginDialog;
