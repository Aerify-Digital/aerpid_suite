import { Box, Grid, Link, Paper, Typography } from '@mui/material';
import ExternalLink from '../components/ExternalLink';

export default function Contact() {
  return (
    <Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
      <Grid item container>
        <Grid item sx={{ p: 2 }} direction="row" xs={12}>
          <Typography variant="h5">Contact & Support</Typography>
        </Grid>

        <Grid item container>
          <Grid item container direction="row">
            <Grid item spacing={2} xs={12}>
              <Box sx={{ m: 1 }}>
                <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
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
              </Box>
            </Grid>
            <Grid item spacing={2} xs={12}>
              <Box sx={{ m: 1 }}>
                <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
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
                        If you encounter a bug/issue or have any suggestions,
                        please open a{' '}
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
                        {
                          <Link href="mailto:support@aerify.digital">
                            Email us
                          </Link>
                        }
                        , we would love the chance to help out!
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
