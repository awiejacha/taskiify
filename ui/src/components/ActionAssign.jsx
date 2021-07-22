import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import { IN_REVIEW } from '../constants/states';
import { taskAssign } from '../services/api';
import personsStore from '../stores/persons';
import tasksStore from '../stores/tasks';

export default function ActionAssign(props) {
  const { t } = useTranslation();
  const { task } = props;
  const [tasks, setTasks] = useRecoilState(tasksStore);
  const [persons] = useRecoilState(personsStore);
  const [selectedPerson, setSelectedPerson] = useState(task.assignee || undefined);

  const options = persons.map((entry) => ({
    // TODO: Translate label
    value: entry,
    label: t(`persons.${entry}`),
  }));

  const onTaskUpdate = (updatedTask) => {
    const transformedTasks = { ...tasks };
    transformedTasks[updatedTask.id] = updatedTask;
    setTasks(transformedTasks);
  };

  const onButtonClick = (event) => {
    event.preventDefault();
    // TODO: Error handling
    taskAssign(task.id, selectedPerson).then((assignedTask) => onTaskUpdate(assignedTask));
  };

  const onSelectChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <div>
      <select value={selectedPerson} onChange={onSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button className="action-button" type="submit" onClick={onButtonClick}>
        {task.state === IN_REVIEW ? '👀' : '🐝'}
      </button>
    </div>
  );
}

ActionAssign.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assignee: PropTypes.string,
  }).isRequired,
};
