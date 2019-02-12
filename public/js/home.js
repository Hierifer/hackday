
var Manubar = React.createClass({

  render: function() {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" onClick={this.slidecontrol}>Hackday</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#"> Home </a></li>
          <li><a href="hackathon.html"> Hackathon </a></li>
          <li><a href="winner.html"> Winner </a></li>
        </ul>
      </div>
    </nav>
    );
  }
});

var Newproject = React.createClass({
  redirect() {
    window.location='/register.html';
  },

  render: function() {
    return (
      <div className="newproject"  >
        <button onClick={this.redirect} type="button" className="btn btn-info"><span id="newproject">Click to Create New Project</span></button>  
      </div>
    );
  }
});



var Projectlist = React.createClass({
  render: function() {
    return (
       <ul className="projectlist">
        <li className="list-group-item"><a href="/regout.html">Project 1</a></li>
        <li className="list-group-item"><a href="/regout.html">Project 2</a></li>
        <li className="list-group-item"><a href="/regout.html">Project 3</a></li>
        <li className="list-group-item"><a href="/regout.html">Project 4</a></li>
        <li className="list-group-item"><a href="/regout.html">Project 5</a></li>
        <li className="list-group-item"><a href="/regout.html">Project 6</a></li>
      </ul>
    );
  }
});

var Username = React.createClass({
  render: function() {
    return (
    <div className="username">
      <h2>Welcome: hierifer@hotmail.com</h2>
    </div>
    );
  }
});


var Slide_block = React.createClass({
  render: function() {
    return (
      <div className="slide_block" id="slide_block">
          <br />
          <Username />
          <Newproject />
          <hr />
          <Projectlist />
      </div>
    );
  }
});


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message:[]};
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
  	var myInit={
      method: "GET"
    };
	fetch("/getlist", myInit).then((response) =>{
		return response.json();
	}).then((data) => {
		this.state.message = data;
		this.setState(this.state);
	})
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

const numbers = [1, 2, 3, 4, 5];

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}



var Container = React.createClass({
  render: function() {
    return (
      <div className="container" id="container">
        <Manubar />
        <Slide_block />
        <Clock />
        <NumberList numbers={numbers} />,
      </div>
    );
  }
});



ReactDOM.render(
  <Container />,
  document.getElementById('page')
);