// tutorial2.js
var Progress_bar = React.createClass({
  render: function() {
        var style = {
          width: '70%'
        }

    return (
    <div className="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={style}>
        10/15 Complete
    </div>
    );
  }
});

var Exit = React.createClass({

  redirect() {
    window.location='/hackathon';
  },

  render: function() {
    return (
      <div className="exit"  >
        <button onClick={this.redirect} type="button" className="btn btn-info"><span id="exit">Exit Voting</span></button>  
      </div>
    );
  }
});


var Progress = React.createClass({
  render: function() {
    return (
    <div className="progress">
      <Progress_bar />
    </div>
    );
  }
});

var Pager = React.createClass({
  render: function() {
    return (
    <ul className="pager">
        <li className="previous"><a href="#">&laquo; Previous</a></li>
        <li className="next"><a href="#">Next &raquo;</a></li>
      </ul>
    );
  }
});

var Grade = React.createClass({
  render: function() {
    $(document).ready(function(){
      $("#flip").click(function(){
          if ($('#panel').is(':visible')){
            $("#panel").slideUp("slow");
            document.getElementById("grade").innerHTML="Grade This";
      } else {
        $("#panel").slideDown("slow");
        document.getElementById("grade").innerHTML="Collect It";
      }
      });
  });

    var style = {
      display:'inline',
      float:'right'
    }
    return (
    <div className="grade"  style={style}>
      <button id="flip" type="button" className="btn btn-info"><span id="grade">Grade This</span></button>  
    </div>
    );
  }
});


var Top_line = React.createClass({
  render: function() {
  var style = {
    display: 'inline'
  }
    return (
    <div className="top_line">
      <h2  style={style}>Project Name</h2>
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
      <p>
  This is the description of project from CS490 group:

  1. good
  2. fast
  3. interesting
      </p>
    </div>
    );
  }
});

var Detail = React.createClass({
  render: function() {
    return (
    <div className="detail">
      <h4>Demo</h4>
      <p>Here is Demo</p>
      <h4>Repository</h4>
      <p>Here is Repository</p>
    </div>
    );
  }
});


var Slide_block = React.createClass({
  render: function() {
  $(document).on("pagecreate","#container",function(){
    $("#slide_block").on("swipeleft",function(){
      alert("You swiped left!");
    });
  });

  $(document).on("pagecreate","#container",function(){
    $("#slide_block").on("swiperight",function(){
      alert("You swiped right!");
    });
  });
    return (
      <div className="slide_block" id="slide_block">
          <br />
            <Progress />
            <Exit />
            <Pager />
            <Top_line />
            <hr />
            <Desc />
            <Detail />
      </div>
    );
  }
});

var Youtube_block = React.createClass({
  render: function() {
    return (
    <div className="embed-responsive embed-responsive-4by3">
      <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/6OyKW0bvkzo"></iframe>
    </div>
    );
  }
});

var Panel = React.createClass({

  render: function() {

    var style = {
      float:'right',
      padding_right: '5px'
    }

    function displayCre(){
      document.getElementById("creativity").innerHTML = document.getElementById("rangecre").value;
    }

    function displayFun(){
      document.getElementById("functions").innerHTML = document.getElementById("rangefun").value;
    }

    return (
      <div className="panel" id="panel">
        <form method="post" action="demoform.asp">
          <div className="well">
            <div className="grade_entry">
              <label>Creativity</label>
              <span id="creativity">5</span>
            </div>
            <input type="range" id="rangecre" min="0" max="10" step="1" onChange={displayCre}></input>
          </div>
          <div className="well">
            <div className="grade_entry">
              <label>Functions:</label>
              <span id="functions">5</span>
            </div>
            <input type="range" id="rangefun" min="0"  max="10" step="1" onChange={displayFun}></input>
          </div>          
          <span style={style}><input type="submit" data-inline="true" value="Submit"></input></span>
        </form>
      </div>
    );
  }
});

var Container = React.createClass({
  render: function() {
    return (
      <div className="container" id="container">
        <Slide_block />
        <Youtube_block />
        <Panel />
      </div>
    );
  }
});

ReactDOM.render(
  <Container />,
  document.getElementById('page')
);