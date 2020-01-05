import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { loadVideoUrl } from "../event-handlers/input-event";

const SearchToolbar = (props) => {
  const { clickSearch, query } = props;
  const inputEl = useRef(null);
  const [queryValue, setQueryValue] = useState(query.link);

  return (
    <div className="form-row">
      <div className="col-7">
        <input type="text" name="queryBox" id="queryBox" placeholder="Please enter Youtube link here" className="form-control" ref={inputEl}
          value={queryValue}
          onChange={e => setQueryValue(e.target.value)}
        />
      </div>
      <div className="col-5">
        <button className="btn btn-secondary pl-4 pr-4" onClick={() => clickSearch(inputEl.current.value)}>
          <i className="fas fa-search fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default connect((state) => ({
  query: state.query
}), (dispatch) => ({
  clickSearch: (link) => dispatch(loadVideoUrl(link))
}))(SearchToolbar);