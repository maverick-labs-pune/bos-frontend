import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Tooltip,
  CardActions
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import api from "../api";
import uniqueId from "lodash/uniqueId";
import find from "lodash/find";
import withStyles from "@material-ui/core/styles/withStyles";
import { withTranslate } from "react-admin";
import { Icon } from "@material-ui/core";
import { withSnackbar } from "notistack";
import FilePlayer from "react-player/lib/players/FilePlayer";
import { CardMedia } from "@material-ui/core";
import {
  checkIfValidImageExtension,
  getFileExtensionFromURL,
  checkIfValidPDFExtension,
  checkIfValidVideoExtension
} from "../utils";
import { Document, Page, pdfjs } from "react-pdf";
import { LOCAL_STORAGE_NGO_KEY } from "../constants";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = {
  required_star: { marginLeft: "5px", color: "red" },
  view_file: { marginLeft: "5px", cursor: "pointer", color: "gray" },
  ml10: { marginLeft: "10px" },
  ml20: { marginLeft: "20px" }
};

function ResourceShow(props) {
  const [resourceData, setResourceData] = useState({});
  const [measurementMaster, setMeasurementMaster] = useState([]);
  const [fileMaster, setFileMaster] = useState([]);
  const [numPages, setNumPages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    const {
      params: { id }
    } = props.match;
    api.getResource(id).then(({ data }) => {
      setResourceData(data);
    });
    api.getMeasurementDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      setMeasurementMaster(data);
    });
    api.getFileDropdownOptionsForNgo(ngoKey).then(({ data }) => {
      setFileMaster(data);
    });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const setAsCoachRegistration = id => {
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    // crudUpdateMany("ping", id, null, "/ping");
    console.log(props);
    api
      .setAsCoachRegistrationSession(ngoKey, { resource: id })
      .then(response => {
        api.handleSuccess(response, props.enqueueSnackbar);
      })
      .catch(error => {
        api.handleError(error, props.enqueueSnackbar);
      });
  };
  const setAsAthleteRegistration = id => {
    const ngoKey = localStorage.getItem(LOCAL_STORAGE_NGO_KEY);
    api
      .setAsAthleteRegistrationSession(ngoKey, { resource: id })
      .then(response => {
        api.handleSuccess(response, props.enqueueSnackbar);
      })
      .catch(error => {
        api.handleError(error, props.enqueueSnackbar);
      });
  };

  const _renderFiles = files => {
    if (!files || files.length === 0 || fileMaster.length === 0) return [];
    const view = [];
    view.push(<h5>Files : </h5>);
    const fileView = files.map(f => {
      const file = find(fileMaster, { key: f.key });
      if (!file) return;
      return (
        <div key={uniqueId()}>
          {file.label}
          <a target="_blank" rel="noopener noreferrer" href={file.data.url}>
            <span className={props.classes.view_file}>view</span>
          </a>
        </div>
      );
    });
    view.push(fileView);
    return <div className={props.classes.ml20}>{view}</div>;
  };

  const _renderMeasurements = measurements => {
    const { translate } = props;
    if (
      !measurements ||
      measurements.length === 0 ||
      measurementMaster.length === 0
    )
      return [];
    const view = [];
    view.push(<h5>{translate("ra.title.measurements")} : </h5>);
    const measurementView = measurements.map(m => {
      const measurement = find(measurementMaster, { key: m.key });
      if (!measurement) return;
      return (
        <div key={uniqueId()}>
          {measurement.label}
          {!measurement.is_required ? (
            <span className={props.classes.required_star}>*</span>
          ) : null}
        </div>
      );
    });
    view.push(measurementView);
    return <div className={props.classes.ml20}>{view}</div>;
  };
  const _renderSession = data => {
    const { files, measurements } = data;
    const view = [];
    view.push(<h4 key={uniqueId()}>{data.label}</h4>);
    view.push(_renderFiles(files));
    view.push(_renderMeasurements(measurements));
    return <div className={props.classes.ml10}>{view}</div>;
  };

  const showButtons = () => {
    const { id, translate } = props;
    console.log(id);
    return (
      <CardActions
        style={{
          justifyContent: "flex-end",
          direction: "row",
          alignItems: "flex-start",
          spacing: 2
        }}
      >
        <CardMedia>
          <Tooltip title={translate("ra.Set As Coach Registration")}>
            <Icon>
              <img
                src={"coach.png"}
                alt=""
                height={40}
                width={40}
                onClick={() => {
                  setAsCoachRegistration(id);
                }}
              />
            </Icon>
          </Tooltip>
        </CardMedia>
        <CardMedia>
          <Tooltip title={translate("ra.Set As Athlete Registration")}>
            <Icon>
              <img
                src={"athletes.png"}
                alt=""
                height={45}
                width={40}
                onClick={() => {
                  setAsAthleteRegistration(id);
                }}
              />
            </Icon>
          </Tooltip>
        </CardMedia>
      </CardActions>
    );
  };

  const _renderRegistration = data => {
    const { files, measurements } = data;
    const view = [];
    view.push(<h4 key={uniqueId()}>{data.label}</h4>);
    view.push(_renderFiles(files));
    view.push(_renderMeasurements(measurements));

    return (
      <div className={props.classes.ml10}>
        <Grid style={{ marginLeft: 260 }}>{showButtons()}</Grid>
        {view}
      </div>
    );
  };

  const _renderFile = () => {
    const { data, label } = resourceData;
    const { url } = data;
    const view = [];
    view.push(<h4 key={uniqueId()}>{label}</h4>);
    const fileExtension = getFileExtensionFromURL(url);
    if (checkIfValidImageExtension(fileExtension)) {
      view.push(<img src={url} alt=""></img>);
    } else if (checkIfValidPDFExtension(fileExtension)) {
      view.push(
        <div>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      );
    } else if (checkIfValidVideoExtension(fileExtension)) {
      view.push(
        <div className="player-wrapper">
          <FilePlayer
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            controls={true}
            light={true}
            playing={false}
          />
        </div>
      );
    }
    // view.push();
    return <div className={props.classes.ml10}>{view}</div>;
  };
  const renderSession = () => {
    const { data } = resourceData;
    return _renderSession(data);
  };

  const renderRegistration = () => {
    const { data } = resourceData;
    return _renderRegistration(data);
  };

  const renderFile = () => {
    return _renderFile();
  };
  const renderCurriculum = () => {
    const {
      data: { days },
      label = ""
    } = resourceData;

    const view = [];
    view.push(<h3>{label}</h3>);
    const daysView = days.map(day => {
      const { sessions } = day;
      const sessionView = sessions.map(session => _renderSession(session));
      const view = [];
      view.push(<h5>{day.label}</h5>);
      view.push(sessionView);
      return view;
    });
    view.push(daysView);
    return view;
  };
  return (
    <Card>
      <CardContent>
        {resourceData.type === "session" ? (
          renderSession()
        ) : resourceData.type === "curriculum" ? (
          renderCurriculum()
        ) : resourceData.type === "file" ? (
          renderFile()
        ) : resourceData.type === "registration" ? (
          renderRegistration()
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}

export default withSnackbar(
  withTranslate(withRouter(withStyles(styles)(ResourceShow)))
);
