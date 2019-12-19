import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  width: {
    width: `-webkit-fill-available`
  }
});

const Primaries = [
  `Name`,
  `Street Address`,
  `Postal code`,
  `Country`,
  `Owner(s) old format`,
  `Owner(s) new format`,
  `Offical website`,
  `Latitude`,
  `Longitude`
];

const BuildingContacts = [
  `First Contact`,
  `Building manager`,
  `Building contact`,
  `Reception`,
  `Security`
];

const Contacts = [
  "Sales person",
  "Last contacted",
  "Number of contact tasks",
  "Number of meetings"
];

const Statuses = [
  "Audits",
  "Last Audit",
  "Quotes",
  "Last quote",
  "Jobs",
  "Last job",
  "Last contacted",
  "Contact details",
  "Primary details",
  "Technical details",
  "Contact"
];

const Technical = [
  `Building function`,
  `Structural material`,
  `Construction start`,
  `Construction completion`,
  `Height architectural`,
  `Height occupied`,
  `Height observatory`,
  `Floors above ground`,
  `Floors below ground`,
  `Number of elevators`,
  `Top elevator speed`,
  `Top gross floor area`,
  `"Number of apartments`,
  `Number of parking spaces`,
  `Status`
];

const JobHistory = [
  "Total facade audits",
  "Last facade audit",
  "Total jobs completed",
  "Last job completed",
  "Total quotes",
  "Last qoute completed",
  "Total invoiced"
];

class BuildingInfoList extends React.Component {
  render() {
    const { classes, information } = this.props;

    console.log(information);

    return (
      <React.Fragment>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Primary information
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {Primaries.map(Primary => (
                <ListItem key={Primary}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Primary}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Primary`][Primary]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Building Contacts */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Building Contacts
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {BuildingContacts.map(Contact => (
                <ListItem key={Contact}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Contact}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Building Contacts`][Contact]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Contact */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Contact</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {Contacts.map(Contact => (
                <ListItem key={Contact}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Contact}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Contact`][Contact]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/*   !Status
         */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Status</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {Statuses.map(Status => (
                <ListItem key={Status}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Status}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Status`][Status]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Technical */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Technical</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {Technical.map(Tech => (
                <ListItem key={Tech}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Tech}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Technical`][Tech]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        {/* Job history */}
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> Job history</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.width}>
              <Divider />
              {JobHistory.map(Job => (
                <ListItem key={Job}>
                  <Grid
                    container
                    direction={`row`}
                    justify={`space-between`}
                    alignItems={`flex-start`}
                  >
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body1`}>{Job}</Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Typography variant={`body2`}>
                        {information[`Job history`][Job]}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </React.Fragment>
    );
  }
}
BuildingInfoList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BuildingInfoList);
