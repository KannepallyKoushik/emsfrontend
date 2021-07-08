import React from "react";

import Grid from "@material-ui/core/Grid";
import Image from "material-ui-image";
import { Container } from "@material-ui/core";

export default function NotStudent() {
  return (
    <div id="wrapper">
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            xs={7}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "85vh" }}
          >
            <h1>Oops!!</h1>
            <h2>Sorry you are not Authorised Student!!!</h2>
          </Grid>
          <Grid item xs={5} style={{ paddingTop: "50px", paddingLeft: "30px" }}>
            <Image src="https://i.imgur.com/qIufhof.png" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
