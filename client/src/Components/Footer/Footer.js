// Importing React since we are using React.
import React from 'react';
// Importing UI components from material-ui-next.
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
const getYr = () => {
  const options = {
    year: 'numeric',
  }
  return new Date().toLocaleString('en-US', options)
}
const styles = {
  root: {
    width: 500,
  },
  copyright: {
    marginTop: 10,
    backgroundColor: '#33658A',
    color: 'white',
  },
  footerContent: {
    backgroundColor: '#33658A',
    color: 'white',
  },
  button: {
    color: 'white',
    float: 'right',
    marginBottom: 60,
  },
};

class Footer extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className="footer">
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2" className={classes.footerContent}>
            HealthCare
          </Typography>
          <Typography component="p" className={classes.footerContent}>
             All Right Reserved by Brute Force
          </Typography>
          <Typography component="p" className={classes.copyright}>
             Copyright &copy; {getYr()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

// Exporting the footer component with styling.
export default withStyles(styles)(Footer);
