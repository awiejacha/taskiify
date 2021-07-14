import PropTypes from 'prop-types';
import React from 'react';
import { useRecoilState } from 'recoil';
import { taskProgress } from '../services/api';
import tasksStore from '../stores/tasks';

export default function ActionProgress(props) {
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
    taskProgress(task.id).then((progressedTask) => onTaskUpdate(progressedTask));
  };

  return (
    <button type="submit" onClick={(event) => onClick(event)}>
      🚀
    </button>
  );
}

ActionProgress.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    responsible: PropTypes.string,
  }).isRequired,
};
