import React, {
  MouseEvent,
  useState,
} from 'react';
import {
  Link,
} from "react-router-dom";

// Material-UI Components Imported
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  IconButton,
  Button,
  Container,
  Typography,
  ListItem,
} from '@mui/material';


// Header for Page Navigation
const Header = () => {
  //Set hooks for setting display of pages and user settings menus
  const [anchorElPages, setAnchorElPages] = useState<Element | ((element: Element) => Element) | null | undefined>(null);
  //Boolean values that determine if page or settings menu is opened
  const openPage = Boolean(anchorElPages);

  // Event handlers to facilitate display of pages and user settings menus
  const handleOpenPagesMenu = (event: MouseEvent) => {
    setAnchorElPages(event.currentTarget);
  };

  const handleClosePagesMenu = () => {
    setAnchorElPages(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Desktop Logo Text, only displays if device reaches MD viewport size */}
          <Button
            href='/'
            variant='text'
            color='inherit'
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Typography
              variant="h6"
              component="div"
              noWrap={true}
              fontWeight="bold"
            >
              Posts
            </Typography>
          </Button>
          {/* Mobile Menu, only displays if device reaches XS viewport size */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <React.Fragment>
              <IconButton
                size="medium"
                aria-haspopup="true"
                aria-label="List of Pages"
                aria-controls="menu-bar"
                onClick={handleOpenPagesMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-bar"
                anchorEl={anchorElPages}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={openPage}
                onClose={handleClosePagesMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <ListItem
                  key={1}
                  button
                  onClick={handleClosePagesMenu}
                  component={Link}
                  to='/'
                >
                  <Typography>Home</Typography>
                </ListItem>
                <ListItem
                  key={2}
                  button
                  onClick={handleClosePagesMenu}
                  component={Link}
                  to='/create'
                >
                  <Typography textAlign="center">Create</Typography>
                </ListItem>
              </Menu>
            </React.Fragment>
          </Box>
          <Button
            href='/'
            variant="text"
            color="inherit"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Typography
              variant="h6"
              component="div"
              noWrap
              fontWeight="bold"
            >
              Posts
            </Typography>
          </Button>
          {/* Desktop Menu, only displays if device reaches at least MD viewport size */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <React.Fragment>
              <Button
                key={1}
                onClick={handleClosePagesMenu}
                sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}
                href='/'
              >
                <Typography>Home</Typography>
              </Button>
              <Button
                key={2}
                onClick={handleClosePagesMenu}
                sx={{ my: 2, ml: 2, color: 'white', display: 'block' }}
                href='/create'
              >
                <Typography>Create</Typography>
              </Button>
            </React.Fragment>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Header;
