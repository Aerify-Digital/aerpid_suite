import { Grid, Link, Paper, Typography } from '@mui/material';
import ExternalLink from '../components/ExternalLink';

export default function Contact() {
  return (
    <Grid container direction="column">
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
          <Typography variant="h5" align="left">
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
          <Typography variant="h6" align="center">
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
                Visit us at our{' '}
                {
                  <ExternalLink url="https://aerify.digital">
                    website
                  </ExternalLink>
                }{' '}
                for the latest updates and product releases!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Head to our{' '}
                {
                  <ExternalLink url="https://aerifydigital.com/store">
                    web store
                  </ExternalLink>
                }{' '}
                to grab our hottest new tech!
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
          <Typography variant="h6" align="center">
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
                Check the{' '}
                {
                  <ExternalLink url="https://docs.aerify.digital/">
                    docs
                  </ExternalLink>
                }{' '}
                for the directions on how to use your AerPID device.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Check out our{' '}
                {
                  <ExternalLink url="https://docs.aerify.digital/blog">
                    Welcome Post
                  </ExternalLink>
                }{' '}
                and blog for latest development info.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                If you encounter a bug/issue or have any suggestions, please
                open a{' '}
                {
                  <ExternalLink url="https://github.com/Aerify-Digital/aerpid_suite/issues/new/choose">
                    issue
                  </ExternalLink>
                }{' '}
                on github .
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" align="center">
                Need more help?{' '}
                {<Link href="mailto:support@aerify.digital">Email us</Link>}, we
                would love the chance to help out!
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
