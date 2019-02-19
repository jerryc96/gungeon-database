import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Api from './api';
//import * as serviceWorker from './serviceWorker';
import './css/index.css';
import titleimg from './assets/Enter-the-gungeon-logo.png';
// images
var api = new Api();
function Img(props){
	return <img className="Img" src={props.src} alt="img" 
	onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}
    />;
}
class Loginbar extends React.Component {
  constructor(){
    super();
    this.state = {
      showLogin:false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
  }

  showLogin(event){
    event.preventDefault();
    this.setState({showLogin:true}, () => {
      document.addEventListener('click', this.closeLogin);
    });
  }

  closeLogin(event) {
    if (!this.dropdown.contains(event.target)){
      this.setState({showLogin:false}, () => {
        document.removeEventListener('click', this.closeLogin);
      });
    }
  }

  handleLogin(event){
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    const password = data.get('password');
    // sanitize input then upload
    api.login({username: username, password: password}, function(err, result){
      if (err) console.log(err);
      console.log(result);
    });
  }
  render(){
    return (
      <div>
      <div className="Loginbar">
        <p id="login">Admin Login</p>
        <br/>
        <button id="loginButton" onClick={this.showLogin}>Login</button>
      </div>
      {
        this.state.showLogin ? 
        (
          <div className="login"
          ref={(element) => {
            this.dropdown = element;
          }}
          >
            <form onSubmit={this.handleLogin} className="Loginmenu" method="post">
              <div>
                <input type="text" name="username" placeholder="username" required/>
                <input type="text" name="password" placeholder="password" required/>
              </div>
              <div></div>
              <button>Login</button>
            </form>
          </div>
        ) 
        : 
        (
          null
        )    
      }
      </div>
    );
  }
}


// info display component
class Infodisplay extends React.Component {
    render() {
        return (
            <div id="infoDisplay" className="Infodisplay">
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
    const response = await fetch('/app/images', {
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
        if (this.state.images !== []){
          this.state.images.forEach((image) => {
            //console.log(image);
            img.push(<Imgdisplay
                key={image.imgData.itemid}
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
            <Loginbar />
            <div className="Titledisplay">
                <img className="titleimg" src={titleimg} alt="Enter the Gungeon Logo"/>
            </div>
    		    <div className="display">
                <Infodisplay />
                <div className="Imgdisplay">
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
