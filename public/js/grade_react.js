// tutorial2.js
var Progress = React.createClass({
  render: function() {
    var progress = Math.floor((this.props.list.did/this.props.list.total) * 100);
    var style = {
      width: progress+'%',
    }

    return (
    <div className="progress">
      <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={style}>
        {this.props.list.did}/{this.props.list.total} Completed
      </div>
    </div>
    );
  }
});

var Exit = React.createClass({
  redirect() {
    var url = "\/post_gradelist?email="+this.props.list.grade[0];
    var myInit = {
        method: 'GET',
    };
    fetch(url, myInit).then((response) =>{
      return response.json();
    }).then((answer) => {
      if(answer==1){
        window.location='/hackathon.html';
      }else{
        window.location='/message.html?err='+ 'grade_cannot_exit';
      }
    })
  },

  render: function() {
    return (
      <div className="exit"  >
        <button onClick={this.redirect} type="button" className="btn btn-info"><span id="exit">Exit Voting{this.props.list.total}</span></button>  
      </div>
    );
  }
});

class Grade extends React.Component {

  panelEvent(){
    if(document.getElementById("panel").style.display != "none"){
      document.getElementById("panel").style.display = "none";
      document.getElementById("grade").innerHTML = "Grade This";  
    } else {
      document.getElementById("panel").style.display = "block";
      document.getElementById("grade").innerHTML = "Collect It";    
    }
  }

  render() {
    var style = {
      display:'inline',
      float:'right'
    }
    return (
    <div className="grade"  style={style}>
      <button id="flip" type="button" className="btn btn-info" onClick={this.panelEvent}><span id="grade">Grade This</span></button>  
    </div>
    );
  }
};


var Top_line = React.createClass({
  render: function() {
  var style = {
    display: 'inline'
  }
    return (
    <div className="top_line">
      <h2  style={style}>{this.props.list.message[this.props.list.current*5+0]}</h2>
      <Grade />
    </div>
    );
  }
});

var Desc = React.createClass({
  render: function() {
  var style = {
    display: 'inline'
  }
  return (
    <div className="desc">
      <pre>{this.props.list.message[this.props.list.current*5+1]}</pre>
    </div>
    );
  }
});

var Detail = React.createClass({
  render: function() {
    return (
    <div className="detail">
      <h4>Demo</h4>
      <p>{this.props.list.message[this.props.list.current*5+3]}</p>
      <h4>Repository</h4>
      <p>{this.props.list.message[this.props.list.current*5+4]}</p>
    </div>
    );
  }
});


var Slide_block = React.createClass({
  render: function() {
    return (
      <div className="slide_block" id="slide_block">
          

      </div>
    );
  }
});

var Youtube_block = React.createClass({
  render: function() {
    return (
    <div className="embed-responsive embed-responsive-4by3">
      <iframe className="embed-responsive-item" src={this.props.list.message[this.props.list.current*5+2]}></iframe>
    </div>
    );
  }
});

var Panel = React.createClass({
  savegrade(){
    document.getElementById("rangecre").disabled = true;
    document.getElementById("rangeImp").disabled = true;
    document.getElementById("rangeVia").disabled = true;
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").value = "Saved Button Disabled";
  },


  render: function() {
    var style_panel = {
      display:'none',
    }
    var style = {
      float:'right',
      padding_right: '5px'
    }


    return (
      <div className="panel" style={style_panel} id="panel">
        <form>
          <div className="well">
            <div className="grade_entry">
              <label>Creativity</label>
              <span id="creativity">5</span>
            </div>
            <input type="range" id="rangecre" min="0" max="10" step="1" onChange={displayCre}></input>
          </div>
          <div className="well">
            <div className="grade_entry">
              <label>Impact:</label>
              <span id="impact">5</span>
            </div>
            <input type="range" id="rangeImp" min="0"  max="10" step="1" onChange={displayImp}></input>
          </div>   
          <div className="well">
            <div className="grade_entry">
              <label>Viability:</label>
              <span id="viability">5</span>
            </div>
            <input type="range" id="rangeVia" min="0"  max="10" step="1" onChange={displayVia}></input>
          </div>         
          <span style={style}><input id="submit" type="submit" data-inline="true" value="Save" onClick={this.savegrade}></input></span>
        </form>
      </div>
    );
  }
});


function Presentation(props){
  return(
    <h2>This is {props.list.current*5}</h2>
  );
}

class Container extends React.Component{
  constructor(props){
    super(props);
    this.state = {message:[], todolist:[], grade:[], total:0, did:0, current: 0};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.go_next = this.go_next.bind(this);
    this.go_prev = this.go_prev.bind(this);
    this.panel_init = this.panel_init.bind(this);
    this.savegrade = this.savegrade.bind(this);
  }

  go_next(){
    if(this.state.current < this.state.total - 1){
      var newCurrent = this.state.current + 1;
      this.setState({
        current : newCurrent
      });
      this.panel_init(newCurrent);
      if(newCurrent == this.state.total - 1){
        document.getElementById("next").innerHTML = "End";
        document.getElementById("prev").innerHTML = "&laquo; Previous"; 
      }
      document.getElementById("prev").innerHTML = "&laquo; Previous";
      document.getElementById("panel").style.display = "none";
    } 
    
  }

  go_prev(){
    if(this.state.current > 0){
      var newCurrent = this.state.current - 1;
      this.setState({
        current : newCurrent
      });
      this.panel_init(newCurrent);
      this.go_change(newCurrent);
      if(this.state.current == 1){
        document.getElementById("next").innerHTML = "Next &raquo";
        document.getElementById("prev").innerHTML = "Begin";
      }
      document.getElementById("next").innerHTML = "Next &raquo";
      document.getElementById("panel").style.display = "none";
    }
  }

  go_change(newCurrent){
    if(newCurrent == 1){

    }else if(newCurrent == this.state.total - 2){

    }else{
      
      document.getElementById("prev").innerHTML = "&laquo; Previous";
    }
  }

  get(str) {
    var v = window.location.search.match(new RegExp('(?:[\?\&]'+str+'=)([^&]+)'));
    if(v){
      return v[1];
    } else {
      window.location='\/hackathon.html';
    }
  }

  componentDidMount() {
    var url = "\/get_gradelist?email="+this.get('email');
    var myInit = {
        method: "GET"
    };
    fetch(url, myInit).then((response) =>{
      return response.json();
    }).then((data) => {
      if(data.length == 1){
        window.location='\/hackathon.html';
      }
      this.state.message = data;
      this.state.grade[0] = this.get('email'); 
      this.state.total = data.length/5;
      for(var i=0; i < this.state.total; i++){
        this.state.todolist[i] = "save";
      }
      this.setState(this.state);
    })
  }

  savegrade(){
    document.getElementById("rangeCre").disabled = true;
    document.getElementById("rangeImp").disabled = true;
    document.getElementById("rangeVia").disabled = true;
    document.getElementById("submit").disabled = true;
    this.state.grade[this.state.current*4+1] = this.state.message[this.state.current*5]; //projectname
    this.state.grade[this.state.current*4+2] = document.getElementById("rangeCre").value,  //creativity
    this.state.grade[this.state.current*4+3] = document.getElementById("rangeImp").value,  //impact
    this.state.grade[this.state.current*4+4] = document.getElementById("rangeVia").value,  //viability
    this.state.todolist[this.state.current] = "saved";
    this.state.did++;
    this.setState(this.state);
  }

  panel_init(newCurrent){
    if(this.state.todolist[newCurrent] == "save"){
      document.getElementById("submit").disabled = false;
      document.getElementById("submit").value = "save it";
      document.getElementById("rangeCre").value = 5;
      document.getElementById("rangeImp").value = 5;
      document.getElementById("rangeVia").value = 5;
      document.getElementById("rangeImp").disabled = false;
      document.getElementById("rangeVia").disabled = false;
      document.getElementById("rangeCre").disabled = false;
    }else{
      document.getElementById("submit").disabled = true;
      document.getElementById("submit").value = "Saved Button Disabled";
      document.getElementById("rangeCre").value = this.state.grade[this.state.current*4+2];
      document.getElementById("rangeImp").value = this.state.grade[this.state.current*4+3];
      document.getElementById("rangeVia").value = this.state.grade[this.state.current*4+4];
      document.getElementById("rangeImp").disabled = true;
      document.getElementById("rangeVia").disabled = true;
      document.getElementById("rangeCre").disabled = true;
    }
    document.getElementById("creativity").innerHTML = document.getElementById("rangeCre").value;
    document.getElementById("impact").innerHTML = document.getElementById("rangeImp").value;
    document.getElementById("viability").innerHTML = document.getElementById("rangeVia").value;    
  }

  render(){
    var list = this.get('email');
    var style_panel = {
      display:'none',
    }
    var style = {
      float:'right',
      padding_right: '5px'
    }

    function displayCre(){
      document.getElementById("creativity").innerHTML = document.getElementById("rangeCre").value;
    }

    function displayImp(){
      document.getElementById("impact").innerHTML = document.getElementById("rangeImp").value;
    }

    function displayVia(){
      document.getElementById("viability").innerHTML = document.getElementById("rangeVia").value;
    }

    return (
      <div className="container" id="container">
        <br />
        <Progress list = {this.state}/>
        <Exit list = {this.state}/>
        <ul className="pager">

          <li className="previous"><a id="prev" onClick={this.go_prev}>Begin</a></li>
          <li className="next"><a id="next" onClick={this.go_next}>Next &raquo;</a></li>
        </ul>
        <Top_line list = {this.state}/>
        <hr />
        <Desc list = {this.state}/>
        <Detail list = {this.state}/>
        <Youtube_block list = {this.state}/>
        
        <div className="panel" style={style_panel} id="panel">
          <form>
            <div className="well">
              <div className="grade_entry">
                <label>Creativity</label>
                <span id="creativity">5</span>
              </div>
              <input type="range" id="rangeCre" min="0" max="10" step="1" onChange={displayCre}></input>
            </div>
            <div className="well">
              <div className="grade_entry">
                <label>Impact:</label>
                <span id="impact">5</span>
              </div>
              <input type="range" id="rangeImp" min="0"  max="10" step="1" onChange={displayImp}></input>
            </div>   
            <div className="well">
              <div className="grade_entry">
                <label>Viability:</label>
                <span id="viability">5</span>
              </div>
              <input type="range" id="rangeVia" min="0"  max="10" step="1" onChange={displayVia}></input>
            </div>         
            <span style={style}><input id="submit" type="submit" data-inline="true" value={this.state.todolist[this.state.current]} onClick={this.savegrade}></input></span>
          </form>
        </div>
      </div>
    );
  }
};

ReactDOM.render(
  <Container />,
  document.getElementById('page')
);