import React from 'react';
import { connect } from 'react-redux';
import { clickCaptionLine } from '../event-handlers/caption-event';

class CaptionViewer extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.curStart !== this.props.curStart) {
      document.querySelector('.caption-viewer .current').scrollIntoView({ behavior: 'smooth', block: "center" });
    }
  }

  render() {
    const { lines, onClickItem } = this.props;

    return (
      lines.length > 0 &&
      <ul className="list-group list-group-flush caption-viewer">
        {
          lines.map(li => (
            <li className={"list-group-item caption-item " + li.current}
              key={li.start} data-start={li.start}
              onClick={e => onClickItem(e.currentTarget.dataset.start)}>
              <span className="caption-item-time">{li.formattedStart}</span>
              <span className="caption-item-text">{li.text}</span>
            </li>
          ))
        }
      </ul>
    );
  }

};

export default connect((state) => ({
  lines: state.caption.lines,
  curStart: state.caption.curStart
}),
  (dispatch) => ({
    onClickItem: (start) => dispatch(clickCaptionLine(start))
  })
)(CaptionViewer);