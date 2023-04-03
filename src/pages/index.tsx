import GifList from '@/components/ListGifs'
import Pokemon from '@/components/Pokemon'
import React, { Component } from 'react'

export default class Index extends Component {
  state = {
    showPokemon: false,
    showGifList: false
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ showPokemon: true, showGifList: false })}>
          Show Pokemon
        </button>
        <button onClick={() => this.setState({ showGifList: true, showPokemon: false })}>
          Show Gif List
        </button>
        {this.state.showPokemon && <Pokemon />}
        {this.state.showGifList && <GifList />}
      </div>
    )
  }
}