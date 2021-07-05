import React from 'react';

export default class TaskCell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, location, definition, state, assignee, responsible } = this.props;

    return <td>
      <div>{id}</div>
      <div>{definition}</div>
      <div>{location}</div>
      <div>{state}</div>
      <div>{assignee || ''}</div>
      <div>{responsible || ''}</div>
    </td>;
  }
}
