import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { first } from 'lodash'

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
  },
  media: {
    height: '150px'
  }
}))



const Product = ({ media, data }) => {
  const classes = useStyles()

  return (
    <Grid item xs={4}>
      <Paper className={cn(classes.item)}>
        {media.length ?
          <CardMedia component={first(media).type} className={classes.media} image={first(media).url} /> :
          <CardMedia className={classes.media} image={Constants.defaultImageUrl} />}

        <p>{data.vendor}</p>
        <p>{data.name}</p>
      </Paper>
    </Grid>
  )
}

Product.propTypes = {
  media: PropTypes.array,
  data: PropTypes.object
}

export default Product
