import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
const ACTIVE = { color: 'red' }

class App extends React.Component {
  render() {
    return  (
      <div className="container">
        <header className="page-header">
          <h1><small>face</small> vote</h1>
        </header>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/" activeStyle={ACTIVE}>VOTE</IndexLink></li>
                <li><Link to="/rank" activeStyle={ACTIVE}>RANK</Link></li>
                <li><Link to="/log" activeStyle={ACTIVE}>LOG</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

class FaceboxItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showDetail: false,
      alreadyVote: false
    };
    this.loveClick = this.loveClick.bind(this);
    this.dislikeClick = this.dislikeClick.bind(this);
    this.clickBox = this.clickBox.bind(this);
  }

  componentDidMount() {
    var identifier = this.props.data._id + "__l";
    // check if you have vote this one
    if(localStorage.getItem(identifier))
    {
      this.setState({alreadyVote: true});
    }
  }

  clickBox() {
    this.setState({showDetail: !this.state.showDetail});
  }

  loveClick() {
    var identifier = this.props.data._id + "__l";
    if(!localStorage.getItem(identifier))
    {
      var url = this.props.source + '/' + this.props.data._id + '/yay';
      fetch(url, {method: 'POST'})
          .then((response) => response.json())
          .then((json) => {
            localStorage.setItem(identifier, true);
            this.props.data.count.yay++;
            this.setState({alreadyVote: true});
          })
          .catch((error) => {
            alert.error('gagal');
              console.error(error);
          });
    }
    else alert.log("you have already love her");
  }

  dislikeClick() {
    var identifier = this.props.data._id + "__l";
    if(!localStorage.getItem(identifier))
    {
      var url = this.props.source + '/' + this.props.data._id + '/nay';
      fetch(url, {method: 'POST'})
          .then((response) => response.json())
          .then((json) => {
            localStorage.setItem(identifier, true);
            this.props.data.count.nay++;
            this.setState({alreadyVote: true});
          })
          .catch((error) => {
            alert.error('gagal');
              console.error(error);
          });
    }
    else alert.log("you have already vote her");
  }

  render() {
    var data = this.props.data;

    // all detail data component
    var sum = <h1 className="count">{data.count.yay - data.count.nay}</h1>;
    var name = <h4 className="name">{data.name}</h4>;
    var yay = <button className="likeButton btn-sm" title="love this" onClick={this.loveClick}>❤</button>;
    var nay = <button className="dislikeButton btn-md" title="dislike this" onClick={this.dislikeClick}>✖</button>;
    var detail;
    var button = <small>You have voted.</small>;
    if(!this.state.alreadyVote)
    {
      button = <span>{yay} {nay}</span>;
    }
    if(this.state.showDetail) {
      detail = <div className="faceboxItemContent">{sum}{name}{button}</div>;
    }

    // style for our div image
    var imageStyle = {
      backgroundImage: 'url('+ data.image +')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    return (
        <div className="col-md-3 col-sm-4 col-xs-6 faceboxItemRoot">
          <div className="faceboxItem" style={imageStyle} onClick={this.clickBox}>
            <ReactCSSTransitionGroup 
              transitionName="thing"
              transitionEnterTimeout={500} 
              transitionLeaveTimeout={300}>
              {detail}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      );
  }
}

// our facebox React class
class Facebox extends React.Component {

  // initial state
  constructor() {
    super();
    this.state = {
      items: [],
      source: "/api/faces"
    };
  }

  // fetch data from our API
  componentDidMount() {  
    fetch(this.state.source)
    .then((response) => response.json())
    .then((json) => {
      this.setState({items: json});
    })
    .catch((error) => {
        console.error(error);
    });
  }

  // render element
  render() {
    var boxItems = [];
    var items = this.state.items;
    for(var i = 0; i < items.length; i++) {
      boxItems.push(<FaceboxItem data={items[i]} key={items[i]._id} source={this.state.source}/>)
    }
    //console.log(this.state.items.count);
    return <div className="faceBox">{boxItems}</div>
  }
}
class RankItem extends React.Component {
  render() {
    return(
      <tr>
        <td className="col-md-1 col-sm-2 text-center"><img className="img-circle img-responsive media-object" src={this.props.data.image} /></td>
        <td className="col-md-8 col-sm-7 text-left"><h4><strong>{this.props.data.name}</strong></h4></td>
        <td className="col-md-1 col-sm-1 text-center"><h4><span className="label label-primary">+{this.props.data.yay}</span></h4></td>
        <td className="col-md-1 col-sm-1 text-center"><h4><span className="label label-danger">-{this.props.data.nay}</span></h4></td>
        <td className="col-md-1 col-sm-1 text-center"><h4><span className="label label-default">{this.props.data.total}</span></h4></td>
      </tr>
    );
  }
}

class Rank extends React.Component {
  constructor() {
      super();
      this.state = {
        items: [],
        source: "/api/faces"
      };
  }

  // fetch data from our API
  componentDidMount() {  
    fetch(this.state.source + '/best/5')
    .then((response) => response.json())
    .then((json) => {
      this.setState({items: json});
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    var rankItems = [];
    var items = this.state.items;
    for(var i = 0; i < items.length; i++) {
      rankItems.push(<RankItem data={items[i]} key={items[i]._id}/>)
    }
    var thead = <thead><tr><th></th><th>name</th><th className="text-center">❤</th><th className="text-center">✖</th><th className="text-center">=</th></tr></thead>;
    return (
      <table className="table">{thead}<tbody>{rankItems}</tbody></table>
    );
  }
}

class NotFound extends React.Component {
  render() {
    return (
      <h2>404 😛</h2>
    );
  }
}

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Facebox} />
      <Route path="rank" component={Rank} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('content'))