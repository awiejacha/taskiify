import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOT_SPECIFIED } from '../constants/locations';
import { DONE, IN_REVIEW, ONGOING, PENDING } from '../constants/states';
import ActionAssign from './ActionAssign';
import ActionProgress from './ActionProgress';
import ActionRegress from './ActionRegress';

export default function TaskCell(props) {
  const { t } = useTranslation();
  const { task } = props;

  const renderLocation = () => (task.location === NOT_SPECIFIED ? '' : t(`locations.${task.location}`));

  const renderPerson = (person) => t(`persons.${person}`);

  const renderAssignee = () => {
    if (!task.assignee) {
      return '';
    }

    if (task.state === IN_REVIEW) {
      return `${task.assignee === task.responsible ? '🐝' : '👀'} ${renderPerson(task.assignee)}`;
    }

    if (task.state === DONE) {
      return '';
    }

    return `🐝 ${renderPerson(task.assignee)}`;
  };

  const renderResponsible = () => {
    if (task.state === IN_REVIEW && task.assignee !== task.responsible) {
      return `🐝 ${renderPerson(task.responsible)}`;
    }

    if (task.state === DONE) {
      return `💤 ${renderPerson(task.responsible)}`;
    }

    return '';
  };

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
        <div>{t(`task_definitions.${task.definition}`)}</div>
        <div>{renderLocation()}</div>
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
