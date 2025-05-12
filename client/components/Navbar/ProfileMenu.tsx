'use client'

import { userLogout } from "@/actions/user.action";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, Box, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { LogOutIcon, UserCircle, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {icon, id} = useAppSelector(state => ({icon: state.user?.icon, id: state.user?.id}))
  const open = Boolean(anchorEl);
  const router = useRouter()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (url: string) => () => {
    router.push(url)
    handleClose()
  }

  const logout = async() => {
    await userLogout()
    router.push('/login')
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="user-icon"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 22, height: 22 }}>
              {icon?.path && <Image src={icon.path} alt="icon" width={22} height={22} />}
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
        <MenuItem onClick={goTo('/profile/' + id)}>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogOutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProfileMenu
