/*
 *  Copyright (c) 2019 Maverick Labs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as,
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState, useEffect } from "react";
import {
  Edit,
  TextInput,
  ShowButton,
  SimpleForm,
  BooleanInput,
  AutocompleteArrayInput,
  SelectInput
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CardActions,
  Input
} from "@material-ui/core";
import api from "../api";
import { GENDER_CHOICES } from "../constants";

const styles = {
  flex: { display: "flex", marginRight: "1rem" }
};

const AthleteEditActions = ({ basePath, data, resource, onToggleDialog }) => {
  console.log(data);
  return (
    <CardActions style={{ justifyContent: "flex-end" }}>
      <ShowButton basePath={basePath} record={data} />
      {/* <Button color="primary" onClick={() => onToggleDialog(data.key)}>Reset Password</Button> */}
    </CardActions>
  );
};

const AthleteEdit = ({ classes, ...props }) => {
  const [showDialog, toggleDialog] = useState(false);
  const [password, handleChangePassword] = useState("");
  const [confirmPassword, handleChangeConfirmPassword] = useState("");
  const [userKey, setUserKey] = useState(null);
  const [resourceChoices, setResourceChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem("ngo_key");
    api.getResourcesByNgo(ngoKey).then(({ data }) => {
      console.log(data);
      const choices = data.map(d => ({ id: d.key, name: d.label }));
      setResourceChoices(choices);
    });
  }, []);

  const resetPassword = () => {
    console.log(password);
    console.log(confirmPassword);
    if (!password || password.length === 0) return;
    if (password === confirmPassword) {
      api.resetPassword(userKey, password).then(() => {
        toggleDialog(!showDialog);
      });
    }
  };
  const handleResourceChoiceChange = data => {
    const arr = Object.values(data);
    if (arr.length > 2) {
      arr.pop();
      const value = arr.pop();
      if (value && arr.includes(value)) {
        data.preventDefault();
      }
    }
  };
  return (
    <div>
      <Edit
        title="Athlete Edit"
        undoable={false}
        actions={
          <AthleteEditActions
            onToggleDialog={userKey => {
              toggleDialog(!showDialog);
              setUserKey(userKey);
            }}
            {...props}
          />
        }
        {...props}
      >
        <SimpleForm>
          <TextInput
            autoFocus
            source="first_name"
            formClassName={classes.flex}
          />
          <TextInput source="middle_name" formClassName={classes.flex} />
          <TextInput source="last_name" formClassName={classes.flex} />
          <SelectInput source="gender" choices={GENDER_CHOICES} />

          <AutocompleteArrayInput
            source="resources"
            choices={resourceChoices}
            onChange={handleResourceChoiceChange}
          />
          <BooleanInput
            source="is_active"
            label="Active"
            formClassName={[classes.is_active]}
          />
        </SimpleForm>
      </Edit>
      <Dialog
        fullWidth
        open={showDialog}
        onClose={() => toggleDialog(!showDialog)}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <div>
            <Input
              value={password}
              type="password"
              onChange={({ target }) => {
                handleChangePassword(target.value);
              }}
              style={{ width: "250px" }}
              placeholder="Enter new password"
            ></Input>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Input
              value={confirmPassword}
              type="password"
              onChange={({ target }) => {
                handleChangeConfirmPassword(target.value);
              }}
              style={{ width: "250px" }}
              placeholder="Confirm new password"
            ></Input>
          </div>
          <div style={{ marginTop: "25px" }}>
            <Button color="primary" variant="raised" onClick={resetPassword}>
              Reset
            </Button>
            <Button
              style={{ marginLeft: "0.8rem" }}
              color="primary"
              onClick={() => toggleDialog(!showDialog)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(AthleteEdit);
