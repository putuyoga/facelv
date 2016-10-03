import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

// Import stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';
import styles from './FaceboxItem.css';

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
    if(localStorage.getItem(identifier)) {
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
    var sum = <span className={styles['textCount']}>{data.count.yay - data.count.nay}</span>;
    var name = <span className={styles['textName']}>{data.name}</span>;
    var yay = <button className={`${styles['likeButton']} ${styles['voteButton']}`} title="love this" onClick={this.loveClick}>❤</button>;
    var nay = <button className={`${styles['dislikeButton']} ${styles['voteButton']}`} title="dislike this" onClick={this.dislikeClick}>👎</button>;
    var detail;
    var button = <small>You have voted.</small>;
    if(!this.state.alreadyVote)
    {
      button = <span>{yay} {nay}</span>;
    }
    if(this.state.showDetail) {
      detail = <div className={styles['faceboxItemContent']}>{sum}{name}{button}</div>;
    }

    // style for our div image
    var imageStyle = {
      backgroundImage: 'url('+ data.image +')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };

    return (
        <div className={`${skeleton['columns']} ${skeleton['six']}`}>
          <div className={styles['faceboxItem']} style={imageStyle} onClick={this.clickBox}>
            <ReactCSSTransitionGroup 
                transitionName={{
                  enter: styles['itemEnter'],
                  enterActive: styles['itemEnterActive'],
                  leave: styles['itemLeave'],
                  leaveActive: styles['itemLeaveActive']
                }}
                transitionEnterTimeout={500} 
                transitionLeaveTimeout={300}
            >
              {detail}
            </ReactCSSTransitionGroup>
          </div>
        </div>
      );
  }
}

export default FaceboxItem;