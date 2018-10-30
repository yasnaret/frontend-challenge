import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactTooltip from 'react-tooltip'
import Masonry from './Masonry'



export default class Images extends Component {

  constructor() {
    super();
    this.state = {
      pictures: [],
      addPage: 1,
      hasMoreItems: false,
    };

    this.buildImages();
  }

  buildImages() {
    //from https://www.flickr.com/services/api/explore/flickr.photos.search
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=967c78a908c3f74879ddf240240f35fa&tags=woman&sort=+relevance&extras=description+%2Ctags%2Cdate_upload%2C+date_taken%2C+owner_name&per_page=40&page=${this.state.page}&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(j => {
        let infoState=this.state.pictures
        j.photos.photo.map(pic => {
        infoState.push(pic);
        });
        this.setState({ 
          addPage: this.state.addPage + 1, 
          addImgs: true });
      });
  }

  render(){
    
    return (
			<div className="container">
				<div className="masonry-container">
					<p>ReactJS Responsive| Masonry Grid | Webpack | API Flickr</p>

          <InfiniteScroll
            pageStart={0}
            loadMore={this.buildImages.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={<div className="loader">Loading wait...</div>}>
					<Masonry brakePoints={this.props.brakePoints}>
						{this.state.pictures.map((pic, id) => {
							return (
                  <div className="tile">
                    <img alt="lady"
                     src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                     key={pic.id}
                     data-for='soclose' data-multiline={true} data-tip={`TITLE: ${pic.title},  TAGS: ${pic.tags}`}
                     data-event='click'/>
		              <ReactTooltip/>
                  </div>
							) 
						})}
					</Masonry>
          </InfiniteScroll>
				</div>
			</div>
		)
  }
}




