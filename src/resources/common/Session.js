import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  Button,
  Input,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import findIndex from "lodash/findIndex";
import PlaceholderItem from "../create/PlaceholderItem";
import { RESOURCE_ITEMS, RESOURCE_TYPES, INPUT_TYPE } from "../../utils";
import api from "../../api";
import DeleteIcon from "@material-ui/icons/Clear";
import { withSnackbar } from "notistack";

export const styles = {
  first_name: { display: "inline-block" },
  last_name: { display: "inline-block", marginLeft: 32 },
  email: { width: 544 },
  is_active: { display: "inline-block" },
  resource_canvas: { height: "100%" },
  label_title: { fontSize: "1rem" },
  item_margin: { marginTop: "10px", marginBottom: "10px", marginLeft: "20px" },
  delete_icon: {
    fontSize: "14px",
    position: "absolute",
    top: "2px",
    left: "4px",
    cursor: "pointer"
  },
  delete_wrapper: { position: "relative" }
};

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};

const PLACEHOLDER_ID = 199;

const PLACEHOLDER_ITEMS = {
  id: PLACEHOLDER_ID
};

const PLACEHOLDER_SESSION = {
  id: PLACEHOLDER_ID
};

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        items: [PLACEHOLDER_ITEMS]
      },
      measurementOptions: [],
      fileOptions: [],
      isEdit: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    const ngoKey = localStorage.getItem("ngo_key");
    const { initialData, isRegistrationForm } = this.props;
    api.getFileDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.key
        };
      });
      this.setState({ fileOptions: sanitizedOptions, filesData: data });
    });
    api.getMeasurementDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      const sanitizedOptions = data.map(option => {
        return {
          label: option.label,
          value: option.key
        };
      });
      this.setState({ measurementOptions: sanitizedOptions });
    });
    if (initialData) {
      const {
        sessionName,
        sessionDescription,
        session
      } = this.props.initialData;
      this.setState({
        sessionName,
        sessionDescription,
        session,
        isEdit: true
      });
    }
  }

  handleAddSessionItemInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionItemLabel: value });
  };

  handleAddSessionItemClick = (sessionId, itemType) => {
    const { session, sessionItem } = this.state;
    const updatedSessionItems = session.items;
    const index = updatedSessionItems.length;
    updatedSessionItems.splice(index - 1, 1, {
      key: sessionItem.value,
      id: randomId(),
      type: itemType
    });
    updatedSessionItems.push(PLACEHOLDER_ITEMS);
    const updatedSession = {
      ...session,
      items: updatedSessionItems
    };
    this.setState({ session: updatedSession });
  };

  handleAddSessionInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ sessionLabel: value });
  };

  handleAddMeasurementInputChange = (sessionId, selectedItem) => {
    console.log(selectedItem);
    this.setState(
      () => ({ sessionItem: selectedItem }),
      () => {
        this.handleAddSessionItemClick(sessionId, RESOURCE_ITEMS.MEASUREMENT);
      }
    );
  };

  handleAddFileInputChange = (sessionId, selectedItem) => {
    this.setState(
      () => ({ sessionItem: selectedItem }),
      () => {
        this.handleAddSessionItemClick(sessionId, RESOURCE_ITEMS.FILE);
      }
    );
  };

  handleSetCompulsory = id => {
    const { items } = this.state.session;
    const i = findIndex(items, { id });
    if (i > -1) {
      items[i].is_required = !items[i].is_required;
    }
    const session = { items };
    this.setState({ session });
  };

  handleDelete = id => {
    const { items } = this.state.session;
    const i = findIndex(items, { id });
    if (i > -1) items.splice(i, 1);
    const session = { items };
    this.setState({ session });
  };

  handleSave = () => {
    this.handleSubmit(false);
  };

  handleSubmit = is_submitting => {
    const {
      session: { items },
      filesData,
      sessionName,
      sessionDescription,
      isEdit
    } = this.state;
    const {
      match: {
        params: { id: resourceKey }
      },
      isRegistrationForm
    } = this.props;
    // return;
    /**
     * filter the placeholders
     * don't need to have the placeholders to be
     * sent to the server
     */
    const files = items
      .filter(item => {
        return item.type === RESOURCE_ITEMS.FILE && item.id !== PLACEHOLDER_ID;
      })
      .map(item => {
        delete item.type;
        delete item.id;
        const selectedFile = find(filesData, { key: item.key });
        const { data, label, key } = selectedFile;
        return {
          data,
          label,
          key
        };
      });

    const measurements = items
      .filter(item => {
        return (
          item.type === RESOURCE_ITEMS.MEASUREMENT && item.id !== PLACEHOLDER_ID
        );
      })
      .map(item => {
        delete item.type;
        delete item.id;
        return item;
      });
    console.log({ files, measurements });
    const resourceType = isRegistrationForm ? "registration" : "session";
    const payload = {
      data: { files, measurements },
      label: sessionName,
      type: resourceType,
      description: sessionDescription,
      is_submitting
    };
    if (isEdit) {
      // Edit api
      if (isRegistrationForm) {
        api
          .saveRegistrationForm(resourceKey, payload)
          .then(response => {
            api.handleSuccess(response, this.props.enqueueSnackbar);
            this.props.history.goBack();
          })
          .catch(error => {
            api.handleError(error, this.props.enqueueSnackbar);
          });
      } else {
        api
          .saveSession(resourceKey, payload)
          .then(response => {
            api.handleSuccess(response, this.props.enqueueSnackbar);
            this.props.history.goBack();
          })
          .catch(error => {
            api.handleError(error, this.props.enqueueSnackbar);
          });
      }
    } else {
      // Create api
      if (isRegistrationForm) {
        api
          .createRegistrationForm(payload)
          .then(response => {
            api.handleSuccess(response, this.props.enqueueSnackbar);
            this.props.history.goBack();
          })
          .catch(error => {
            api.handleError(error, this.props.enqueueSnackbar);
          });
      } else {
        api
          .createSession(payload)
          .then(response => {
            api.handleSuccess(response, this.props.enqueueSnackbar);
            this.props.history.goBack();
          })
          .catch(error => {
            api.handleError(error, this.props.enqueueSnackbar);
          });
      }
    }
    // console.log(filtered);
  };
  render() {
    const { classes, isRegistrationForm, ...props } = this.props;
    const { session, isEdit, sessionDescription, sessionName } = this.state;
    return (
      <div className={classes.root}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h4>
              {isEdit
                ? isRegistrationForm
                  ? "Edit Registration Form"
                  : "Edit Training Session"
                : isRegistrationForm
                ? "Create Registration Form"
                : "Create Training Session"}
            </h4>
          </div>
          <div>
            <Button onClick={this.handleSave} contained="true" color="primary">
              Save
            </Button>
            {/* <Button onClick={() => this.handleSubmit(true)} color="primary">
              Submit
            </Button> */}
          </div>
        </div>
        <Card style={{ overflow: "initial" }}>
          <CardContent>
            <div>
              <Input
                style={{ width: "200px", marginBottom: "24px" }}
                placeholder="Name"
                value={sessionName || ""}
                onChange={({ target: { value } }) => {
                  this.setState({ sessionName: value });
                }}
              />
            </div>
            <div>
              <Input
                style={{ width: "500px", marginBottom: "24px" }}
                placeholder="Description"
                multiline
                value={sessionDescription || ""}
                onChange={({ target: { value } }) => {
                  this.setState({ sessionDescription: value });
                }}
              />
            </div>
            {this.renderSessionItems(session.items, session.id)}
          </CardContent>
        </Card>
      </div>
    );
  }

  renderSessionItems = (items, sessionId) => {
    const { measurementOptions, fileOptions } = this.state;
    return items.map((item, index) => {
      return item.id === PLACEHOLDER_ID ? (
        <div key={uniqueId()}>
          <PlaceholderItem
            inputType={INPUT_TYPE.DROPDOWN}
            onInputChange={selected =>
              this.handleAddMeasurementInputChange(sessionId, selected)
            }
            title="+ Add Measurement"
            inputPlaceholderText="Enter Item Title"
            style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}
            options={this.state.measurementOptions}
          />
          <PlaceholderItem
            inputType={INPUT_TYPE.DROPDOWN}
            onInputChange={selected =>
              this.handleAddFileInputChange(sessionId, selected)
            }
            title="+ Add File"
            inputPlaceholderText="Enter Item Title"
            style={{
              marginTop: "10px",
              marginBottom: "10px"
            }}
            options={this.state.fileOptions}
          />
        </div>
      ) : (
        <div key={uniqueId()} className={this.props.classes.item_margin}>
          <span className={this.props.classes.label_title}>
            {find(measurementOptions.concat(fileOptions), {
              value: item.key
            })
              ? find(measurementOptions.concat(fileOptions), {
                  value: item.key
                }).label
              : ""}
          </span>
          <a style={{ position: "relative" }}>
            <DeleteIcon
              onClick={() => this.handleDelete(item.id)}
              className={this.props.classes.delete_icon}
            />
          </a>
          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={item.is_required}
                  onChange={() => {
                    this.handleSetCompulsory(item.id);
                  }}
                />
              }
              label="Mandatory"
            />
          </div>
        </div>
      );
    });
  };

  renderSessions = (session, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px", overflow: "initial" }}>
        <span className={this.props.classes.label_title}>{session.label}</span>
        {this.renderSessionItems(session.items, session.id)}
      </div>
    );
  };
}

export default withRouter(withSnackbar(withStyles(styles)(Session)));
