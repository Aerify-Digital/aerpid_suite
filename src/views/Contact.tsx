import { Grid, Paper, Typography } from '@mui/material';

export default function Contact() {
  return (
    <Grid container direction="column" spacing={1} item sx={{ mt: 2, mb: 2 }}>
      <Grid item sx={{ mt: 1, mb: 1 }} alignContent="center">
        <Grid
          item
          style={{
            maxWidth: '800px',
            width: `${(700 / 800) * 100}vw`,
            margin: 'auto',
            paddingBottom: '4vmin',
            paddingTop: '4vmin',
            paddingLeft: '4vmin',
            paddingRight: '4vmin'
          }}
        >
          <Typography variant="h4" align="left" paddingLeft={1}>
            Contact & Support
          </Typography>
        </Grid>
        <Paper
          elevation={3}
          style={{
            maxWidth: '800px',
            width: `${(700 / 800) * 100}vw`,
            margin: 'auto',
            paddingBottom: '4vmin',
            paddingTop: '4vmin',
            paddingLeft: '4vmin',
            paddingRight: '4vmin'
          }}
        >
          <Typography variant="h5" align="center">
            Aerify Digital
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Visit us at our website for the latest updates and product
                releases!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Head to the web-store to grab our hottest new tech!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Check out our list of authorized retailers here to find us
                locally!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Want to see us in your favorite local shop? Print this and give
                it to them as a way to introduce us. Or fill out a suggestion
                form here, and we will reach out ourselves!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sx={{ mt: 1, mb: 1 }} alignContent="center">
        <Paper
          elevation={3}
          style={{
            maxWidth: '800px',
            width: `${(700 / 800) * 100}vw`,
            margin: 'auto',
            paddingBottom: '4vmin',
            paddingTop: '4vmin',
            paddingLeft: '4vmin',
            paddingRight: '4vmin'
          }}
        >
          <Typography variant="h5" align="center">
            Support & Sales
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Check the digital User Guide for the latest directions on how to
                use your AerTiny. This is updated with each major firmware
                upgrade, and may be downloaded as a pdf.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Head to the FAQ for quick help with your device.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Need more help? Email us, we would love the chance to help out!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                If you are interested in becoming an Authorized-Retailer of our
                devices please feel free to fill out an application here. For
                any other sales based inquiries please feel free to email sales,
                they love a good chat!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
