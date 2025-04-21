'use client'

import { deleteTopic } from "@/actions/topics.actions"
import Button from "@/ui/Button"
import Toast from "@/ui/Toast"
import { Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { MoreVerticalIcon } from "lucide-react"
import * as motion from 'motion/react-client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Option = 'Edit' | 'Delete'
const options: Option[] = ['Edit', 'Delete']
const ITEM_HEIGHT = 48;

const TopicCard = ({ topic, i, edit, maxWidth }: {topic: Topic, i: number, edit?: boolean, maxWidth?: number}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter()
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleClose(); // Close the menu
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    const { message } = await deleteTopic(topic.id)
    if (message === 'SUCCESS') {
      handleCloseDialog();
      router.refresh()
    } else {
      // Show error in dialog
      Toast('Failed to delete topic', 'success');
      handleCloseDialog();
    }
  };

  const handleOptionSelect = async (selectedOption: Option) => {
    switch (selectedOption) {
      case 'Edit':
        router.push(`/topics/${topic.id}/edit`)
        break
      case 'Delete':
        handleOpenDialog();
        break
    }
  }
  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        style={{height: '100%', position: 'relative'}}
      >
          {edit && <div style={{position: 'absolute', top: '5px', right: '5px'}}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVerticalIcon color="#ccc" />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={() => handleOptionSelect(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>}
        <Card className="challenge-card" elevation={3} sx={{borderRadius: 5, height: '100%', maxWidth, cursor: 'pointer'}} onClick={() => router.push(`/topics/${topic.id}`)}>
          <CardMedia
            component="img"
            height={maxWidth ? '110' : "194"}
            image={topic.image.path || '/images/default-topic.jpg'}
            alt={topic.title}
          />
          <CardContent >
            <Typography variant="h6" fontWeight="bold">{topic.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {topic.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Topic"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{topic.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={handleDelete} background="#f33" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TopicCard