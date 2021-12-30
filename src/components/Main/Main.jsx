import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import { useContext } from "react";
import { ExpenseTrackerContext } from "../../context/context";

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);
  
  return (
    <Card className={classes.root}>
      <CardHeader
        align="center"
        title="Expense Tracker"
        subheader="With Voice Functionality"
      />
      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ${ balance }
        </Typography>
        <Typography
          align="center"
          variant="subtitle1"
          style={{ lineHeight: "1.5rem", marginTop: "20px" }}
        >
          {/* Infocard... */}
          <b>Try saying:</b> Add income for $100 in Category Salary for
          Monday...
        </Typography>
        <Divider />
        <Form />
        <CardContent className={classes.cartContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List />
            </Grid>
          </Grid>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default Main;
