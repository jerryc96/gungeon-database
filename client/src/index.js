import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Api from './api';
//import * as serviceWorker from './serviceWorker';
import './css/index.css';
import './css/guns.css';
import titleimg from './assets/Enter-the-gungeon-logo.png';
// images
var api = new Api();
function Img(props){
	return (
    <div className={props.imageid} alt="img" 
	  onMouseOver={props.onMouseOver}
    onMouseLeave={props.onMouseLeave}>
    </div>
  );
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
              <p id="name"></p>
              <p id="quote"></p>
              <p id="description"></p>
            </div>
        );
     }
}

//search bar component

class Imgdisplay extends React.Component {
    showText(){
        const image = this.props.image;
        document.getElementById("name").innerHTML = image.Name;
        document.getElementById("quote").innerHTML = image.Quote;
        //document.getElementById("description").innerHTML = this.props.image.Description;
    }
    hideText(){
        document.getElementById("name").innerHTML = "";
        document.getElementById("quote").innerHTML = "";
    }
	renderImg(id) {
		return (
			<Img
        className = "item-img"
        imageid = {"gun" + id}
			  onMouseOver={() => this.showText()}
        onMouseLeave={() => this.hideText()}
			/>
		);
	}
	render(){
    const image = this.props.image;
    const id = image.itemid.toString();
		return (
			<div>
				{this.renderImg(id)}
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
            img.push(<Imgdisplay
                key={image.itemid}
                image={image}
            />);
          });
        }
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
