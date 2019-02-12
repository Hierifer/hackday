
var Manubar = React.createClass({
  render: function() {
    return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" onClick={this.slidecontrol}>Hackday</a>
        </div>
        <ul className="nav navbar-nav">
          <li><a href="home.html"> Home </a></li>
          <li className="active"><a href="#"> Hackathon </a></li>
          <li><a href="winner.html"> Winner </a></li>
        </ul>
      </div>
    </nav>
    );
  }
});

var Top = React.createClass({
  render: function() {
    return (
    <div className="top">
        <h2>Welcome to Tenx Hackathon</h2>
        <h4>The current stage is <strong>Voting</strong></h4>
    </div>
    );
  }
});

var Search = React.createClass({
  render: function() {
    return (
        <form>
        <input type="text" defaultValue="Search Team ID" />
        <button className="btn btn-primary" type="button" ><span className="submit">Submt</span></button>
        </form>
    );
  }
});

var Dropdown = React.createClass({
  render: function() {
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Sorting Methods
            <span ></span></button>
            <ul className="dropdown-menu">
              <li><a href="#">Sort by Creativity</a></li>
              <li><a href="#">Sort by Impact</a></li>
              <li><a href="#">Sort by Viability</a></li>
            </ul>
        </div>
    );
  }
});

var Projecttable = React.createClass({
  render: function() {
    return (
    <table className="table table-hover">
    <thead>
        <tr>
        <th>Team ID</th>
        <th>Description</th>
        <th>Creativity</th>
        <th>Impact</th>
        <th>Viability</th>
        <th>Status</th>
        <th>Vote</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td><a href=""> Tenx_Hackday1 </a></td>
        <td>This is a description of tenx hackday1 project.</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>In Progress</td>
        <td><a href="/grade.html"> Click to Vote Project</a></td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday2 </a></td>
        <td>This is a description of tenx hackday2 project.</td>
        <td>90</td>
        <td>90</td>
        <td>80</td>
        <td>Submitted</td>
        <td><a href="/grade.html"> Click to Vote Project</a></td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday3 </a></td>
        <td>This is a description of tenx hackday3 project.</td>
        <td>70</td>
        <td>60</td>
        <td>90</td>
        <td>Voted</td>
        <td>Already Done</td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday4 </a></td>
        <td>This is a description of tenx hackday4 project.</td>
        <td>80</td>
        <td>100</td>
        <td>80</td>
        <td>Voted</td>
        <td>Already Done</td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday5 </a></td>
        <td>This is a description of tenx hackday5 project.</td>
        <td>100</td>
        <td>90</td>
        <td>90</td>
        <td>Submitted</td>
        <td><a href="/grade.html"> Click to Vote Project</a></td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday6 </a></td>
        <td>This is a description of tenx hackday6 project.</td>
        <td>70</td>
        <td>80</td>
        <td>70</td>
        <td>Submitted</td>
        <td><a href="/grade.html"> Click to Vote Project</a></td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday7 </a></td>
        <td>This is a description of tenx hackday7 project.</td>
        <td>60</td>
        <td>70</td>
        <td>80</td>
        <td>Voted</td>
        <td>Already Done</td>
    </tr>
    <tr>
        <td><a href=""> Tenx_Hackday8 </a></td>
        <td>This is a description of tenx hackday8 project.</td>
        <td>60</td>
        <td>100</td>
        <td>80</td>
        <td>Graded</td>
        <td>Closed</td>
    </tr>
    </tbody>
  </table>
    );
  }
});


var Slide_block = React.createClass({
  render: function() {
    return (
      <div className="slide_block" id="slide_block">
          <br />
            <Top />
            <hr />
            <Search />
            <Dropdown />
            <Projecttable />
      </div>
    );
  }
});

var Container = React.createClass({
  render: function() {
    return (
      <div className="container" id="container">
        <Manubar />
        <Slide_block />
      </div>
        
    );
  }
});

ReactDOM.render(
  <Container />,
  document.getElementById('page')
);