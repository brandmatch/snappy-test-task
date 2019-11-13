import React, { useEffect, useState } from 'react'

import { map, orderBy } from 'lodash'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import Constants from '../../utils/constants'
import Product from '../Product'
import Promotion from '../Promotion'

const useStyles = makeStyles(theme => ({
  name: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  vendor: {
    margin: theme.spacing(0, 2, 2, 2),
    marginLeft: '50%'
  },
  container: {
    marginTop: '15px'
  }
}))

const ProductsList = () => {
  const classes = useStyles()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({ name: '', vendor: '' })
  const [promotion, setPromotion] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Constants.dataUrl)
      const data = await response.json()
      let products = data.products

      if (products.length) {
        products.push(data.promotion)
      }

      products = orderBy(products, Constants.orderField, Constants.orderDirection)

      setProducts(products)
      setFilteredProducts(products)
      setPromotion(data.promotion)
    }

    fetchData()
  }, [])

  const handleSearch = event => {
    const data = products.concat().filter(product => {
      return product.media &&
        product.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 &&
        product.vendor.toLowerCase().indexOf(filters.vendor) >= 0
    })

    if (data.length) {
      data.push(promotion)
    }

    setFilters({
      name: event.target.value.toLowerCase(),
      vendor: filters.vendor
    })

    setFilteredProducts(data)
  }

  const handleVendorChange = event => {
    let searchPhrase = event.target.value.toLowerCase()

    if (searchPhrase === 'all') {
      searchPhrase = ''
    }

    const data = products.concat().filter(product => {
      return product.media &&
        product.name.toLowerCase().indexOf(filters.name) >= 0 &&
        product.vendor.toLowerCase().indexOf(searchPhrase) >= 0
    })

    if (data.length) {
      data.push(promotion)
    }

    setFilters({
      name: filters.name,
      vendor: searchPhrase
    })

    setFilteredProducts(data)
  }

  return (
      <Container maxWidth="lg" className={classes.container}>
        <FormControl className={classes.name}>
          <TextField id="search" label="Name" placeholder="Search Phrase" onChange={handleSearch} />
        </FormControl>

        <FormControl className={classes.vendor}>
          <InputLabel id="label">Vendor</InputLabel>
          <Select labelId="label" id="select" defaultValue="all" onChange={handleVendorChange}>
            <MenuItem value="all">Show all</MenuItem>
            {map(Constants.vendors, (value, key) => {
              return (
                <MenuItem key={key} value={key}>{value}</MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
        {filteredProducts.map((data, index) => {
          if (!data.media) {
            return (
              <Promotion key={index} />
            )
          }
          const media = data.media.some(media => media.type === Constants.mediaTypes.video) ?
            data.media.filter(media => media.type === Constants.mediaTypes.video) :
            data.media.filter(media => media.type === Constants.mediaTypes.image)

          return (
            <Product key={index} media={media} data={data} />
          )
        })}
    </Grid>
    </Container>
  )
}

export default ProductsList
