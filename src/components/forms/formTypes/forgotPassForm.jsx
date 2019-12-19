import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material-ui imports 
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LinearDeterminate from '../../animations/loader';

class ForgotPassForm extends React.Component {
    state = {
        firstName: '',
        email: '',
    }

    render() {

        return (
            //error checking is done in parent class (Form) in the handleSubmit
            <Grid container spacing={40} style={{ marginTop: '3%' }}>
                <Grid item style={{ width: '100%' }}>

                    <form onSubmit={this.handleSubmit}>

                        {/* Form inputs */}
                        <Grid container direction={'column'}>
                            <Grid item>
                              </Grid>
                            <Grid item>
                             </Grid>
                        </Grid>
                        <Grid container direction={'row'} style={{ marginTop: '3%' }}>
                            <Grid item lg={0} style={{ width: '35%', }}>
                             </Grid>
                            <Grid item lg={0} style={{ width: '35%', position: 'absolute', right: '7%' }}>
                            </Grid>
                        </Grid>
                        <LinearDeterminate />
                    </form>
                </Grid>
            </Grid>
        );
    }
}


export default ForgotPassForm;