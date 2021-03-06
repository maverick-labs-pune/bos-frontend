import React from "react";
import { MenuItem, Input, Menu } from "@material-ui/core";

export default function UserSelectionMenu(props) {
  // const [menuAnchorEl,setMenuAnchorEl] = useState(null);
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.menuAnchorEl}
      keepMounted
      open={props.isOpen}
      onClose={props.onClose}
    >
      <MenuItem>
        <Input
          placeholder="Add children by name"
          onChange={({ target }) => {
            props.onSearchUser(target.value);
          }}
          value={props.searchTerm}
        />
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.onUserSelected("remove_parent");
        }}
      >
        --Remove parent--
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.onUserSelected("remove_children");
        }}
      >
        --Remove children--
      </MenuItem>
      {props.userOptions.slice(0, 5).map((option) => {
        return (
          <MenuItem
            key={option.key}
            onClick={() => {
              props.onUserSelected(option);
            }}
          >
            {option.label}
          </MenuItem>
        );
      })}
      {props.userOptions.length > 5 ? (
        <MenuItem>and {props.userOptions.length - 5} more..</MenuItem>
      ) : null}
    </Menu>
  );
}
