/* ================================================================== */
/* ======================================================== IMPORTS = */
/* ================================================================== */
// the comments for imports are a little messy due to prettier formatting
import React from 'react'; // React Module
import PropTypes from 'prop-types'; // React Module
import { makeStyles } from '@material-ui/core/styles'; // MUI Module
import AppBar from '@material-ui/core/AppBar'; // MUI Module
import Tabs from '@material-ui/core/Tabs'; // MUI Module
import Tab from '@material-ui/core/Tab'; // MUI Module
import Typography from '@material-ui/core/Typography'; // MUI Module
import Box from '@material-ui/core/Box'; // MUI Module

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

/* ================================================================== */
/* ========================================================= STYLES = */
/* ================================================================== */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

/* ================================================================== */
/* =========================================================== MAIN = */
/* ================================================================== */
export default function ScrollableTabsButtonAuto({ renderNotAnswered, renderAnswered }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* ======================================================== RENDER = */
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Not Answered" {...a11yProps(0)} />
          <Tab label="Answered" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {renderNotAnswered}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderAnswered}
      </TabPanel>
    </div>
  );
}
