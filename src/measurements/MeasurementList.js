import React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  TextField,
  BooleanInput,
  ReferenceField,
  Responsive,
  SearchInput,
  ReferenceInput,
  SelectInput,
  ShowButton
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import { hasAccess } from "ra-auth-acl";

const MeasurementFilter = props => (
  <Filter {...props}>
    <SearchInput label="Label" source="label" alwaysOn />
    <BooleanInput alwaysOn source="is_active" />
    <ReferenceInput label="Type" source="type" reference="measurement_types">
      <SelectInput optionText="label" />
    </ReferenceInput>
  </Filter>
);

const styles = {
  nb_commands: { color: "purple" }
};

const MeasurementList = ({ classes, permissions, ...props }) => (
  <List
    {...props}
    filters={<MeasurementFilter />}
    sort={{ field: "label", order: "ASC" }}
    perPage={25}
    filterDefaultValues={{ is_active: true }}
  >
    <Responsive
      medium={
        <Datagrid>
          <TextField source="label" type="text" />
          <TextField source="uom" type="text" />
          <ReferenceField
            label="Type"
            source="type"
            reference="measurement_types"
            linkType={false}
          >
            <TextField source="label" />
          </ReferenceField>

          <BooleanField source="is_active" type="text" />
          <DateField source="creation_time" showTime />
          <DateField source="last_modification_time" showTime />
          {hasAccess(permissions, "measurements.show") && <ShowButton />}
          {hasAccess(permissions, "measurements.edit") && <EditButton />}
        </Datagrid>
      }
    />
  </List>
);

export default withStyles(styles)(MeasurementList);
