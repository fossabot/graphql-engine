import React from 'react';
import Common from '../Common/Common';

import { addResolver, RESET } from './addResolverReducer';
import Helmet from 'react-helmet';

class Add extends React.Component {
  componentWillUnmount() {
    this.props.dispatch({ type: RESET });
  }
  render() {
    const styles = require('../Styles.scss');
    const { isRequesting, dispatch } = this.props;
    return (
      <div className={styles.addWrapper}>
        <Helmet title="Add Schema - Stitched Schemas | Hasura" />
        <div className={styles.heading_text}>Add a new remote schema</div>
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch(addResolver());
          }}
        >
          <Common {...this.props} />
          <div className={styles.commonBtn}>
            <button
              type="submit"
              className={styles.yellow_button}
              disabled={isRequesting}
            >
              {isRequesting ? 'Creating...' : 'Stitch Schema'}
            </button>
            {/*
            <button className={styles.default_button}>Cancel</button>
            */}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.customResolverData.addData,
    ...state.customResolverData.headerData,
  };
};

export default connect => connect(mapStateToProps)(Add);
