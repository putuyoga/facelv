import ReactDOM from 'react-dom';
import React from 'react';

// import stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';

// import component
import FaceboxItem from './FaceboxItem';

/** Component facebox root container. */
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
    var rowItems = [];
    var items = this.state.items;
    for(var i = 0; i < items.length; i+=2) {
      var columnItems = [];
      for(var j = i; j < i + 2 && j < items.length; j++){
        columnItems.push(<FaceboxItem data={items[j]} key={items[j]._id} source={this.state.source}/>);
      }
      rowItems.push(<div className={skeleton['row']} key={j}>{columnItems}</div>);
    }
    return <div className={skeleton['row']}>{rowItems}</div>;
  }
}

export default Facebox;