import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ReactTooltip from 'react-tooltip';
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
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=83a51b990a9c0df9960f7eed8c19dda5&tags=woman&extras=description,date_upload,tags,date_taken,last_update,owner_name&per_page=20&page=${this.state.addPage}&format=json&nojsoncallback=1`)
      .then(res => res.json())
      .then(j => {
        let infoState=this.state.pictures
        j.photos.photo.map(pic => {
        infoState.push(pic);
        });
        this.setState({ 
          addPage:(this.state.addPage + 1), 
          hasMoreItems: true,});
      });
  }

  render(){
    
    return (
			<div className="container">
				<div className="masonry-container">
					<p>ReactJS Responsive| Masonry Grid | Webpack | API Flickr</p>

          <InfiniteScroll
          //CONFIGURACIONES DE SCROLL
            pageStart={0}
            loadMore={this.buildImages.bind(this)}
            hasMore={this.state.hasMoreItems}
            loader={<div className="loader">Loading wait...</div>}
          >
					<Masonry brakePoints={this.props.brakePoints}>
          
						{this.state.pictures.map((pic, id) => {
							return (
                  <div className="tile" key ={id}>
                    <img alt="lady"
                     src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                     key={pic.id}
                     //Configuración para Tooltips
                     data-event='click'
                     data-for='imgFromFlickr'
                     data-multiline={true} 
                     data-tip={`Titulo: ${pic.title},
                     Descripción:${pic.description._content},
                     Fecha-Post:${pic.datetaken},
                     Fecha-Act:${pic.dateupload},
                     Tags:${pic.tags},
                     Autor:${pic.ownername}`}/>
                     <ReactTooltip 
                     className='extraClass'
                     id='imgFromFlickr'
                     getContent={(dataTip) =>`${dataTip}`}
                     place="bottom"
                     type="info" 
                     effect="solid"
                     />
                    
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




