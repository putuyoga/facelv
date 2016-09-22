import ReactDOM from 'react-dom';
import React from 'react';

// import component
import FaceboxItem from './FaceboxItem';

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

export default Facebox;