import React from "react";
import { Grid } from "@material-ui/core";
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";

function App() {
  
  return (
    <>
      <Grid
       container
       direction="row"
       justifyContent="center"
       alignItems="center"
       spacing={2}
        
      >
        <Grid item xs={12} sm={4}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} > 

          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} > 
          <Details title="Expense" />
        </Grid>
      </Grid>

      <Grid item>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </Grid>
    </>
  );
}

export default App;
