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

import React from "react";
import { Edit, TextInput, SimpleForm, BooleanInput } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { translate } from "react-admin";

import { styles } from "./NgoCreate";

const NgoEdit = translate(({ classes, translate, ...props }) => (
  <Edit undoable={false} title={translate("ra.edit ngo")} {...props}>
    <SimpleForm>
      <TextInput
        autoFocus
        label={translate("ra.title.label")}
        source="label"
        formClassName={classes.label}
      />
      <TextInput
        label={translate("ra.title.uom")}
        source="uom"
        formClassName={classes.uom}
      />
      <BooleanInput
        source="is_active"
        //label="Active"
        label={translate("ra.action.active")}
        formClassName={classes.is_active}
      />
    </SimpleForm>
  </Edit>
));

export default withStyles(styles)(NgoEdit);
