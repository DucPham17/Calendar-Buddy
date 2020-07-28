import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar } from '@material-ui/core';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ScheduleIcon from '@material-ui/icons/Schedule';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		flexgrow: 1
	}
}));

function NavTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
		<AppBar position="static" color="default">
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
			>
				<Tab icon={<ScheduleIcon />} label="Check Schedule" to='/mainscreen' component={Link}/>
				<Tab icon={<SearchIcon />} label="Find Free Time" to='/findfreetime' component={Link}/>
				<Tab icon={<PersonOutlineIcon />} label="Profile" to='/profilescreen' component={Link}/>
			</Tabs>
		</AppBar>
		</div>
  );
}

export default NavTabs;
