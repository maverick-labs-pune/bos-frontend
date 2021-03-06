import React from "react";
import {
  Edit,
  SelectArrayInput,
  ReferenceArrayInput,
  TextInput,
  SimpleForm,
  BooleanInput,
  TextField,
  ReferenceField
} from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import FullNameField from "../common/FullNameField";
import { translate } from "react-admin";

export const styles = {
  label: { display: "block" },
  uom: { display: "block" },
  type: { display: "block" },
  is_active: { display: "block" }
};

export const validateReadingCreation = values => {
  const errors = {};
  if (!values.label) {
    errors.label = ["Required"];
  }
  if (!values.input_type) {
    errors.input_type = ["Required"];
  }
  if (!values.types || values.types.length === 0) {
    errors.types = ["Required"];
  }
  return errors;
};

const ReadingEdit = translate(({ classes, translate, ...props }) => (
  <Edit undoable={false} title="Reading Edit" {...props}>
    <SimpleForm validate={validateReadingCreation}>
      <ReferenceField
        label={translate("ra.title.athlete")}
        source="user"
        reference="athletes"
        target="key"
        linkType={false}
      >
        <FullNameField label="Full name" />
      </ReferenceField>
      <ReferenceField
        label={translate("ra.title.measurements")}
        source="measurement"
        reference="measurements"
        target="key"
        linkType={false}
      >
        <TextField source="label" />
      </ReferenceField>

      <TextInput
        label={translate("ra.title.value")}
        source="value"
        formClassName={classes.input_type}
      />
      <BooleanInput
        source="is_active"
        label={translate("ra.action.active")}
        formClassName={classes.is_active}
        defaultValue={true}
      />
    </SimpleForm>
  </Edit>
));

export default withStyles(styles)(ReadingEdit);
