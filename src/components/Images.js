import React, { Component } from 'react';


export default class Images extends Component {

  constructor() {
    super();
    this.state = {
      pictures: [],
    };
  }

  componentDidMount() {
    //from https://www.flickr.com/services/api/explore/flickr.photos.search
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f45b96e80316446649d82d3d211ce5a8&tags=LADY&format=json&nojsoncallback=1&auth_token=72157697097041790-55c586651e0289e4&api_sig=949b7cc45eb111969d4757ede2740aff')
      .then(response => {
        return response.json()
      })
      .then(function (j) {

        let picArray = j.photos.photo.map(pic => {
        let srcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
          return ( 
          <img alt="lady" src={srcPath} key= {pic.id}></img>
          )
        })
        this.setState(
          {pictures: picArray}
        )
      }.bind(this))
  }

  render(){

    return ( 

    <div className ="root">
        {this.state.pictures}
    </div>

    );
  }
}