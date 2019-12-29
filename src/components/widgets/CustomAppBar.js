import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function CustomAppBar() {
  // We use React useState Hook to simulate constructor state.
  // every useState can optionally assign default value and have a reflector method set in second param
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const menuList = [
    { label: "Home", url: "" },
    { label: "Form", url: "" }
  ];
  const handleShowMore = evt => {
    setAnchorEl(evt.currentTarget);
  };
  const handleClose = evt => {
    setAnchorEl(null);
  };
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  const generateDrawerList = () => {
    return (
      <div
        role="presentation"
        style={{ width: 200 }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {menuList.map((item, index) => (
            <ListItem button key={item.label}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flex: 1 }}>
          News
        </Typography>
        <IconButton
          aria-label="show more"
          aria-haspopup="true"
          color="inherit"
          onClick={handleShowMore}
        >
          <MoreIcon />
        </IconButton>
      </Toolbar>
      <Menu
        id="popup-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Website</MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </Menu>

      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {generateDrawerList()}
      </SwipeableDrawer>
    </AppBar>
  );
}
export default CustomAppBar;
