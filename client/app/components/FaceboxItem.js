import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

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

export default FaceboxItem;