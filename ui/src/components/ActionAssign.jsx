import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { taskAssign } from '../services/api';
import { IN_REVIEW } from '../constants/states';
import personsAtom from '../stores/persons';
import tasksAtom from '../stores/tasks';

export default function ActionAssign(props) {
  const { task } = props;
  const [tasks, setTasks] = useRecoilState(tasksAtom);
  const [persons] = useRecoilState(personsAtom);
  const [selectedPerson, setSelectedPerson] = useState(task.assignee || null);

  const options = persons.map((person) => ({
    value: person,
    label: person.charAt(0).toUpperCase() + person.substr(1).toLowerCase(),
  }));

  const onTaskUpdate = (updatedTask) => {
    const transformedTasks = { ...tasks };
    transformedTasks[updatedTask.id] = updatedTask;
    setTasks(transformedTasks);
  };

  const onButtonClick = async (event) => {
    event.preventDefault();
    const assignedTask = await taskAssign(task.id, selectedPerson);
    onTaskUpdate(assignedTask);
  };

  const onSelectChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <div>
      <button type="submit" onClick={onButtonClick}>
        {task.state === IN_REVIEW ? '👀' : '🐝'}
      </button>
      <select value={selectedPerson} onChange={onSelectChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

ActionAssign.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
  }).isRequired,
};
