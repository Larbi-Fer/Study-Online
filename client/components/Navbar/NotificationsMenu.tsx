'use client'

import { notificationSeen } from "@/actions/user.action";
import { setNotificationSeen } from "@/lib/features/notifications";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Avatar, Box, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { BellDotIcon, BellIcon, LogOutIcon, UserCircle, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notifs = useAppSelector(state => state.notifications)
  const open = Boolean(anchorEl);
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (notif: NotificationProps) => {
    if (!notif.isSeen) {
      notificationSeen(notif.userId, notif.id)
      
      dispatch(setNotificationSeen(notif.id))
    }
    router.push(notif.link)
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifications">
          <div
            onClick={handleClick}
            className="user-icon"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 22, height: 22, background: 'transparent' }}>
              {notifs.findIndex(n => !n.isSeen) == -1 ? <BellIcon color="#000" /> : <BellDotIcon color="#f33" />}
            </Avatar>
          </div>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notifs.length == 0 ?
          <div style={{padding: '10px 20px', color: '#888', textAlign: 'center'}}>
            <Image src='/icons/no_notification.png' alt="no-notification" width={90} height={90} />
            <h3>There is no notification</h3>
          </div>
        :
          notifs.map(n => (
            <div key={n.id}>
              <MenuItem onClick={() => goTo(n)} style={{
                  margin: '10px',
                  borderRadius: '10px',
                  position: 'relative',
                  maxWidth: '400px',
                  textWrap: 'balance'
                }}>
                {n.content}
                {!n.isSeen && <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '100%',
                    background: '#f22',
                    position: 'absolute',
                    top: '5px',
                    left: '5px'
                  }}></span>}
              </MenuItem>
              <Divider />
            </div>
          ))
        }
      </Menu>
    </>
  )
}

export default NotificationMenu
