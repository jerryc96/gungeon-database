import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';

import './css/index.css';
import Casey from './assets/Casey.png';
import MarineSidearm from './assets/Marine_Sidearm.png';
import titleimg from './assets/Enter-the-gungeon-logo.png';
const CaseyInfo = "a baseball bat";
const CaseyId = "casey";
const MSideId = "marine sidearm";
const MSideInfo = "a standard military sidearm";

// images
function Img(props){
	return <img className="Img" src={props.imgsrc} alt="img" 
	onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
    />;
}

// info display component
// class Infodisplay extends React.Component {
//     render() {
//         return (
//              <>
//         );
//      }
// }

// search bar component

class Imgdisplay extends React.Component {
    showText(){
        document.getElementById(this.props.id).style.display = "block";
    }
    hideText(){
        document.getElementById(this.props.id).style.display = "none";
    }
	renderImg(src, id) {
		return (
			<Img
              className = "item-img"
			  imgsrc = {src}
			  onMouseOver={() => this.showText()}
              onMouseLeave={() => this.hideText()}
			/>
		);
	}
	render(){
        const img = this.props.img;
        const id = this.props.id;
		return (
			<div>
				<div className="img-row">
				{this.renderImg(img, id)}
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
      };
    }
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
        this.props.images.forEach((image) => {
            img.push(<Imgdisplay 
                img={image.img}
                id={image.key}
                info={image.info}
                />);
        });
        console.log(img);
    	return (
    		<div className='MainPage'>
              <div className="titleDisplay">
                <img className="titleimg" src={titleimg} />
              </div>
    		  <div className="display">
              {img}
    		  </div>
    		</div>
    	);
    }
}

const IMAGES = [
   {img: Casey, key: CaseyId, info: CaseyInfo},
   {img: MarineSidearm, key: MSideId, info: MSideInfo}
];

ReactDOM.render(
  <Index images={IMAGES}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
