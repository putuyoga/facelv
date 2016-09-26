import React from 'react';
import RankItem from './RankItem';
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
    this.serverRequest = fetch(this.state.source + '/best/5')
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
      rankItems.push(<RankItem data={items[i]} key={items[i]._id}/>);
    }
    var thead = <thead><tr><th/><th>name</th><th className="text-center">❤</th><th className="text-center">✖</th><th className="text-center">=</th></tr></thead>;
    return (
      <table className="table">{thead}<tbody>{rankItems}</tbody></table>
    );
  }
}

export default Rank;