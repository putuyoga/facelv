import React from 'react';

// Import Stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';
import styles from './RankItem.css';

class RankItem extends React.Component {
  render() {
    return(
      <tr className={`${skeleton['row']} ${styles['rankItem']}`}>
        <td className={`${skeleton['columns']} ${skeleton['two']}`}>
          <img className={styles['avatar']} src={this.props.data.image} />
        </td>
        <td className={`${skeleton['columns']} ${skeleton['eight']}`}>
          <span className={styles['textName']}><strong>{this.props.data.name}</strong></span>
        </td>
        <td className={`${skeleton['column']} ${skeleton['one']}`}>
          <span className={styles['textYay']}>+{this.props.data.yay}</span>
        </td>
        <td className={`${skeleton['column']} ${skeleton['one']}`}>
          <span className={styles['textNay']}>-{this.props.data.nay}</span>
        </td>
        <td className={`${skeleton['column']} ${skeleton['one']}`}>
          <span className={styles['textTotal']}>+{this.props.data.total}</span>
        </td>
      </tr>
    );
  }
}

export default RankItem;