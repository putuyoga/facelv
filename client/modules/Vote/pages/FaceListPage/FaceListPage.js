import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import component
import FaceboxItem from '../../components/FaceboxItem/FaceboxItem';

// Import actions
import { fetchFaces } from '../../FaceActions';

// import stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';

// import Selectors
import { getFaces } from '../../FaceReducer';

/** Component facebox root container. */
class FaceListPage extends React.Component {

  // fetch data from our API
  componentDidMount() {
    this.props.dispatch(fetchFaces());
  }

  // render element
  render() {
    var rowItems = [];
    var items = this.props.faces;
    for(var i = 0; i < items.length; i+=2) {
      var columnItems = [];
      for(var j = i; j < i + 2 && j < items.length; j++){
        columnItems.push(<FaceboxItem data={items[j]} key={items[j]._id} />);
      }
      rowItems.push(<div className={skeleton['row']} key={j}>{columnItems}</div>);
    }
    return <div className={skeleton['row']}>{rowItems}</div>;
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    faces: getFaces(state)
  };
}

FaceListPage.propTypes = {
  faces: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.shape({
        yay: PropTypes.number,
        nay: PropTypes.number
    })
  })).isRequired,
  dispatch: PropTypes.func.isRequired
};

FaceListPage.contextTypes = {
  router: React.PropTypes.object
};

export default connect(mapStateToProps)(FaceListPage);