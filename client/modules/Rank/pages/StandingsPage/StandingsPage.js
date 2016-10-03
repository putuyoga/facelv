import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';

// Import actions
import { fetchBestFaces } from '../../RankActions';

// import Selectors
import { getBestFaces } from '../../RankReducer';

// Import Component
import RankItem from '../../components/RankItem/RankItem';

class StandingsPage extends React.Component {

  // fetch data from our API
  componentDidMount() {  
    this.props.dispatch(fetchBestFaces());
  }

  render() {
    var rankItems = [];
    var items = this.props.faces;
    
    for(var i = 0; i < items.length; i++) {
      rankItems.push(<RankItem data={items[i]} key={items[i]._id}/>);
    }
    var thead = <thead><tr><th/><th>name</th><th className="text-center">❤️</th><th className="text-center">👎</th><th className="text-center">=</th></tr></thead>;
    return (
      <table className={skeleton['u-full-width']}>{thead}<tbody>{rankItems}</tbody></table>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    faces: getBestFaces(state)
  };
}

StandingsPage.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    total: PropTypes.number,
    yay: PropTypes.number,
    nay: PropTypes.number
  })).isRequired,
  dispatch: PropTypes.func.isRequired
};

StandingsPage.contextTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps)(StandingsPage);