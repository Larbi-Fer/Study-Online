import { Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { MoreVerticalIcon } from "lucide-react"
import * as motion from 'motion/react-client'
import { useEffect, useState } from "react"

type Option = 'Edit' | 'delete'
const options: Option[] = ['Edit', 'delete']
const ITEM_HEIGHT = 48;

const TopicCard = ({ topic, i, edit }: {topic: Topic, i: number, edit?: boolean}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [option, setOption] = useState<Option | null>(null)
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!option) return
    console.log(option);
    setOption(null)
  }, [option])
  

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        style={{height: '100%'}}
      >
        <Card className="challenge-card" elevation={3} sx={{borderRadius: 5, height: '100%', position: 'relative'}}>
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
                <MenuItem key={option} onClick={() => {
                  setOption(option)
                  handleClose()
                }}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>}
          <CardMedia
            component="img"
            height="194"
            image={topic.image.path || '/images/default-topic.jpg'}
            alt={topic.title}
          />
          <CardContent>
            <Typography variant="h6" fontWeight="bold">{topic.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {topic.description}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
  )
}

export default TopicCard