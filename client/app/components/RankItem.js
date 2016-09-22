import React from 'react';

class RankItem extends React.Component {
  render() {
    return(
      <tr>
        <td className="col-md-1 col-sm-2 col-xs-2 text-center">
          <img className="img-circle img-responsive media-object" src={this.props.data.image} />
        </td>
        <td className="col-md-8 col-sm-7 col-xs-7 text-left">
          <h4><strong>{this.props.data.name}</strong></h4>
        </td>
        <td className="col-md-1 col-sm-1 col-xs-1 text-center">
          <h4><span className="label label-primary">+{this.props.data.yay}</span></h4>
        </td>
        <td className="col-md-1 col-sm-1 col-xs-1 text-center">
          <h4><span className="label label-danger">-{this.props.data.nay}</span></h4>
        </td>
        <td className="col-md-1 col-sm-1 col-xs-1 text-center">
          <h4><span className="label label-default">{this.props.data.total}</span></h4>
        </td>
      </tr>
    );
  }
}

export default RankItem;