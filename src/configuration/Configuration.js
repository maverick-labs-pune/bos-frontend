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
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { translate, changeLocale, Title } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";
import compose from "recompose/compose";
import { changeTheme } from "./actions";
import { locale_en, locale_hi } from "../constants";

const styles = {
  label: { width: "10em", display: "inline-block" },
  button: { margin: "1em" }
};

const Configuration = ({
  classes,
  theme,
  locale,
  changeTheme,
  changeLocale,
  translate
}) => (
  <Card>
    <Title title={translate("ra.configuration")} />
    <CardContent>
      <div className={classes.label}>{translate("ra.title.theme")}</div>
      <Button
        variant="raised"
        className={classes.button}
        color={theme === "light" ? "primary" : "default"}
        onClick={() => changeTheme("light")}
      >
        {translate("ra.theme.light")}
      </Button>
      <Button
        variant="raised"
        className={classes.button}
        color={theme === "dark" ? "primary" : "default"}
        onClick={() => changeTheme("dark")}
      >
        {translate("ra.theme.dark")}
      </Button>
    </CardContent>
    <CardContent>
      <div className={classes.label}>{translate("ra.title.language")}</div>
      <Button
        variant="raised"
        className={classes.button}
        color={locale === locale_en ? "primary" : "default"}
        onClick={() => changeLocale(locale_en)}
      >
        {translate("ra.language.en")}
      </Button>
      <Button
        variant="raised"
        className={classes.button}
        color={locale === locale_hi ? "primary" : "default"}
        onClick={() => changeLocale(locale_hi)}
      >
        {translate("ra.language.hi")}
      </Button>
    </CardContent>
  </Card>
);

const mapStateToProps = state => ({
  theme: state.theme,
  locale: state.i18n.locale
});

const enhance = compose(
  connect(mapStateToProps, {
    changeLocale,
    changeTheme
  }),
  translate,
  withStyles(styles)
);

export default enhance(Configuration);
