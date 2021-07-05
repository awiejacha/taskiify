import React from 'react';
import TaskCell from './TaskCell';

function renderCell(renderState, item) {
  return item.state === renderState ? <TaskCell
    key={item.id}
    id={item.id}
    location={item.location}
    definition={item.definition}
    state={item.state}
    assignee={item.assignee || null}
    responsible={item.responsible || null}
  /> : <td></td>
}

export default class TasksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/tasks/list")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>Pending</th><th>Ongoing</th><th>In review</th><th>Done</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr>
                {renderCell('pending', item)}
                {renderCell('ongoing', item)}
                {renderCell('in_review', item)}
                {renderCell('done', item)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}
