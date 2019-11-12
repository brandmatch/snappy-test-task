import React from 'react'
import cn from 'classnames'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'

import Constants from '../../utils/constants'

const useStyles = makeStyles(theme => ({
  item: {
    margin: '15px',
    padding: '5px',
    maxWidth: '250px',
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Promotion = () => {
  const classes = useStyles()

  return (
    <Grid item xs={4}>
      <Paper className={cn(classes.item)}>
        <CardMedia className={classes.media} image={Constants.promotionCardUrl} />

        <p>Promotion</p>
        <p>Card</p>
      </Paper>
    </Grid>
  )
}

export default Promotion
