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
import withStyles from "@material-ui/core/styles/withStyles";

import { styles, validateUserGroupCreation } from "./UserGroupCreate";
import {
  Edit,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput,
  AutocompleteArrayInput
} from "react-admin";
import api from "../api";

const UserGroupEdit = ({ classes, permissions, ...props }) => {
  const [resourceChoices, setResourceChoices] = useState([]);
  const [userChoices, setUserChoices] = useState([]);
  useEffect(() => {
    //fetch possible resource choices.
    const ngoKey = localStorage.getItem("ngo_key");
    api.getResourcesByNgo(ngoKey).then(({ data }) => {
      console.log(data);
      const choices = data.map(d => ({ id: d.key, name: d.label }));
      setResourceChoices(choices);
    });
    api.getAllUsersByNgo(ngoKey).then(({ data }) => {
      const choices = data.map(d => ({
        id: d.key,
        name: `${d.first_name + d.last_name}`
      }));
      setUserChoices(choices);
    });
  }, []);
  const handleChoiceChange = data => {
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
    <Edit {...props}>
      <SimpleForm
        undoable={false}
        redirect="list"
        validate={validateUserGroupCreation}
      >
        <TextInput autoFocus source="label" formClassName={classes.label} />
        <AutocompleteArrayInput
          source="users"
          choices={userChoices}
          onChange={handleChoiceChange}
        />
        <AutocompleteArrayInput
          source="resources"
          choices={resourceChoices}
          onChange={handleChoiceChange}
        />
        <BooleanInput
          source="is_active"
          label="Active"
          formClassName={classes.is_active}
          defaultValue={true}
        />
      </SimpleForm>
    </Edit>
  );
};

export default withStyles(styles)(UserGroupEdit);
