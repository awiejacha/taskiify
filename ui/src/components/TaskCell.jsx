import React from 'react';
import PropTypes from 'prop-types';
import ActionAssign from './ActionAssign';
import ActionProgress from './ActionProgress';
import ActionRegress from './ActionRegress';
import { PENDING, ONGOING, IN_REVIEW } from '../constants/states';

export default function TaskCell(props) {
  const { task } = props;

  const renderAssignee = () => {
    if (task.assignee === null) {
      return '';
    }

    if (task.state === IN_REVIEW) {
      return `${task.assignee === task.responsible ? '🐝' : '👀'} ${task.assignee}`;
    }

    return `🐝 ${task.assignee}`;
  };

  const renderResponsible = () => {
    if (task.state !== IN_REVIEW || task.assignee === task.responsible) {
      return '';
    }

    return `🐝 ${task.responsible}`;
  };

  // eslint-disable-next-line consistent-return
  const renderActionBoxes = () => {
    switch (task.state) {
      case PENDING:
        return task.assignee ? (
          <div>
            <ActionProgress task={task} />
          </div>
        ) : (
          <div>
            <ActionAssign task={task} />
          </div>
        );
      case ONGOING:
        return (
          <div>
            <ActionProgress task={task} />
            <ActionRegress task={task} />
          </div>
        );
      case IN_REVIEW:
        return task.assignee === task.responsible ? (
          <div>
            <ActionAssign task={task} />
          </div>
        ) : (
          <div>
            <ActionProgress task={task} />
            <ActionRegress task={task} />
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <td>
      <div>
        <div>
          <small>{task.id}</small>
        </div>
        <div>{task.definition}</div>
        <div>{task.location}</div>
        <div>{renderAssignee()}</div>
        <div>{renderResponsible()}</div>
      </div>
      {renderActionBoxes()}
    </td>
  );
}

TaskCell.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    responsible: PropTypes.string,
  }).isRequired,
};
