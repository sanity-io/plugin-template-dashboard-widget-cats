import React from 'react'
import PropTypes from 'prop-types'
import getIt from 'get-it'
import jsonResponse from 'get-it/lib/middleware/jsonResponse'
import promise from 'get-it/lib/middleware/promise'
import styles from './Cats.css'

const request = getIt([promise(), jsonResponse()])

class Cats extends React.Component {
  static propTypes = {
    imageWidth: PropTypes.number
  }

  static defaultProps = {
    imageWidth: 200
  }

  state = {
    imageUrl: null,
    error: null
  }

  componentDidMount() {
    request({url: 'https://api.thecatapi.com/v1/images/search'})
      .then(response => {
        const imageUrl = response.body[0].url
        this.setState({imageUrl})
      })
      .catch(error => this.setState({error}))
  }

  render() {
    const {imageUrl, error} = this.state
    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    const {imageWidth} = this.props
    return (
      <div className={styles.container}>
        <h2>A cat</h2>
        <img src={imageUrl} width={imageWidth} />
      </div>
    )
  }
}

export default {
  name: 'cats',
  component: Cats
}
