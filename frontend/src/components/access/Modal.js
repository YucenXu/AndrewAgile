import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,Button, TextField} from '@mui/material';


function Modal(props){
    if (!props.show){
        return null;
    }else{
        return (  
            <div>
           <IconButton edge="start" onClick={props.onClose} aria-label="close"><CloseIcon/></IconButton>
           <Dialog open={props.show} onClose={props.onClose}>
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To invite new user, please enter email address here. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={props.onClose}>Send</Button>
        </DialogActions>
      </Dialog>
            </div>
        );
    }
}
export default Modal;