import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOT_SPECIFIED } from '../constants/locations';
import { DONE, IN_REVIEW, ONGOING, PENDING } from '../constants/states';
import ActionAssign from './ActionAssign';
import ActionProgress from './ActionProgress';
import ActionRegress from './ActionRegress';
import './TaskCell.scss';

export default function TaskCell(props) {
  const { t } = useTranslation();
  const { task } = props;

  const renderDefinition = () => t(`task_definitions.${task.definition}`);

  const renderLocation = () => (task.location === NOT_SPECIFIED ? '' : ` ${t(`locations.${task.location}`)}`);

  const renderPerson = (person) => t(`persons.${person}`);

  const renderAssignee = () => {
    if (!task.assignee || task.state === DONE) {
      return [];
    }

    let line = '';

    if (task.state === IN_REVIEW) {
      line = `${task.assignee === task.responsible ? '🐝' : '👀'}\u00A0\u00A0${renderPerson(task.assignee)}`;
    } else {
      line = `🐝\u00A0\u00A0${renderPerson(task.assignee)}`;
    }

    return [<div className="task-cell-assignee">{line}</div>];
  };

  const renderResponsible = () => {
    let line = '';

    if (task.state === IN_REVIEW && task.assignee !== task.responsible) {
      line = `🐝\u00A0\u00A0${renderPerson(task.responsible)}`;
    }

    if (task.state === DONE) {
      line = `💤\u00A0\u00A0${renderPerson(task.responsible)}`;
    }

    return line ? [<div className="task-cell-responsible">{line}</div>] : [];
  };

  /**
   * @return JSX.Element[]
   */
  const renderActionBoxes = () => {
    switch (task.state) {
      case PENDING:
        return task.assignee ? [<ActionProgress task={task} />] : [<ActionAssign task={task} />];
      case ONGOING:
        return [<ActionProgress task={task} />, <ActionRegress task={task} />];
      case IN_REVIEW:
        return task.assignee === task.responsible
          ? [<ActionAssign task={task} />]
          : [<ActionProgress task={task} />, <ActionRegress task={task} />];
      default:
        return [];
    }
  };

  /**
   * return JSX.Element
   */
  return (
    <td>
      <div className="task-cell-summary">
        {renderDefinition()}
        {renderLocation()}
      </div>
      <div className="task-cell">
        <div className="task-cell-info">
          {renderAssignee()}
          {renderResponsible()}
        </div>
        <div className="task-cell-actions">{renderActionBoxes()}</div>
      </div>
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
