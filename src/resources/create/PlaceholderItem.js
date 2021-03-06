import React, { useState } from "react";
import {
  Button,
  TextField,
  Divider,
  Typography,
  Grid,
  Card,
  CardContent,
  Input
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CreatableSelect from "react-select/creatable";
import { RESOURCE_ITEMS, INPUT_TYPE } from "../../utils";
import Select from "react-select";
import { withTranslate } from "react-admin";

const styles = {
  placeholder_item: {
    marginTop: "16px",
    marginBottom: "16px",
    boxShadow: "3px 4px 4px 0px #1716161c",
    padding: "12px 16px",
    borderRadius: "4px",
    backgroundColor: "#28369354",
    cursor: "pointer",
    width: "180px",
    "&:hover": { backgroundColor: "#3342a5c7" }
  },
  item_input: { padding: "4px", backgroundColor: "white", width: "250px" },
  add_button: { marginTop: "10px" },
  placeholder_title: { fontSize: "1rem", color: "white" }
};

function PlaceholderItem({
  onInputChange,
  onAddClick,
  title,
  translate,
  ...props
}) {
  const [showInput, updateInputState] = useState(false);

  const handleInputState = () => {
    updateInputState(!showInput);
  };
  return showInput ? (
    <div className={props.classes.item_input} style={{ ...props.style }}>
      {props.inputType === INPUT_TYPE.DROPDOWN ? (
        <Select
          style={{ marginTop: "10px" }}
          isSearchable
          options={props.options}
          onChange={onInputChange}
        />
      ) : props.inputType === INPUT_TYPE.CREATABLE_DROPDOWN ? (
        <CreatableSelect
          style={{ marginTop: "10px" }}
          placeholder="Select existing or create..."
          isClearable
          onChange={onInputChange}
          options={props.options}
          onCreateOption={props.onCreateOption}
        />
      ) : (
        <>
          <Input
            contained="true"
            onChange={onInputChange}
            type="text"
            placeholder={props.inputPlaceholderText}
          ></Input>
          <Button
            outlined="true"
            className={props.classes.add_button}
            onClick={onAddClick}
            color="primary"
          >
            {translate("ra.action.add")}
          </Button>
        </>
      )}
    </div>
  ) : (
    <div
      className={props.classes.placeholder_item}
      onClick={handleInputState}
      style={{ ...props.style }}
    >
      <span className={props.classes.placeholder_title}>{title}</span>
    </div>
  );
}

export default withTranslate(withStyles(styles)(PlaceholderItem));
