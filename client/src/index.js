import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import './css/index.css';
import titleimg from './assets/Enter-the-gungeon-logo.png';
// images
function Img(props){
	return <img className="Img" src={props.src} alt="img" 
	onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
    />;
}

// info display component
class Infodisplay extends React.Component {
    render() {
        return (
             <div id="infoDisplay" className="infoDisplay">
               <p>
               </p>
             </div>
        );
     }
}

//search bar component

class Imgdisplay extends React.Component {
    showText(){
        document.getElementById("infoDisplay").innerHTML = this.props.info;
    }
    hideText(){
        document.getElementById("infoDisplay").innerHTML = "";
    }
	renderImg(src, meta, id) {
    src = "data:" + meta.mime +";" + meta.encoding +"," + src;
		return (
			<Img
        className = "item-img"
			  src = {src}
			  onMouseOver={() => this.showText()}
        onMouseLeave={() => this.hideText()}
			/>
		);
	}
	render(){
        const img = this.props.img;
        const id = this.props.id;
        const meta = this.props.meta;
		return (
			<div>
				<div className="img-row">
				{this.renderImg(img, meta, id)}
                <p className="img-textbox" id={id}>
                    {this.props.info}
                </p>
				</div>
			</div>
		);
	}
}

class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        images:[]
      };
    }
    componentDidMount() {
      this.retriveImage().then(res => {
        this.setState({images: res.imageList});
      })
      .catch(err => console.log(err));
    }
    // retrieve images from server
    retriveImage = async () => {
    const response = await fetch('/api/images', {
      method: 'GET'
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
    };


    // when image clicked on, go to image page
    imgClick(){
    	return (
    		<div>
    		<p>{"click"}</p>
    		</div>
    	);
    }

    imgHover(id){
        console.log(this.id);
    }
    // when image is hovered over, display elmt
    render(){
        const img = [];
        console.log(this.state.images);
        if (this.state.images !== []){
          this.state.images.forEach((image) => {
            img.push(<Imgdisplay
                img={image.image}
                id={image.imgData.Name}
                meta={image.meta}
                info={image.imgData.Description} 
            />);
          });
        }
        // this.props.images.forEach((image) => {
        //     img.push(<Imgdisplay 
        //         img={image.img}
        //         id={image.key}
        //         info={image.info}
        //         />);
        // });
    	return (
    		<div className='MainPage'>
              <div className="titleDisplay">
                <img className="titleimg" src={titleimg} />
              </div>
    		  <div className="display">
              <Infodisplay className="infoDisplay"/>
              <div className="imgDisplay">
                {img}
              </div>
    		  </div>
    		</div>
    	);
    }
}

ReactDOM.render(
  <Index/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
