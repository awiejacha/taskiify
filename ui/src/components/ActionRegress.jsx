import PropTypes from 'prop-types';
import React from 'react';
import { useRecoilState } from 'recoil';
import { taskRegress } from '../services/api';
import { IN_REVIEW } from '../constants/states';
import tasksStore from '../stores/tasks';

export default function ActionRegress(props) {
  const { task } = props;
  const [tasks, setTasks] = useRecoilState(tasksStore);

  const onTaskUpdate = (updatedTask) => {
    const transformedTasks = { ...tasks };
    transformedTasks[updatedTask.id] = updatedTask;
    setTasks(transformedTasks);
  };

  const onClick = (event) => {
    event.preventDefault();
    // TODO: Error handling
    taskRegress(task.id).then((regressedTask) => onTaskUpdate(regressedTask));
  };

  return (
    <button type="submit" onClick={(event) => onClick(event)}>
      {task.state === IN_REVIEW ? '⛔' : '♻'}
    </button>
  );
}

ActionRegress.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    responsible: PropTypes.string,
  }).isRequired,
};
