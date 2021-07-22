import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { DONE, IN_REVIEW, ONGOING, PENDING } from '../constants/states';
import tasksStore from '../stores/tasks';
import ActionCreate from './ActionCreate';
import TaskCell from './TaskCell';
import './TasksTable.scss';

export default function TasksTable() {
  const [tasks] = useRecoilState(tasksStore);
  const { t } = useTranslation();

  const renderCell = (renderState, task) =>
    task.state === renderState ? <TaskCell key={task.id} task={task} /> : <td />;

  return (
    <div>
      <ActionCreate />
      <table className="tasks-table">
        <thead>
          <tr>
            <th>{t(`states.${PENDING}`)}</th>
            <th>{t(`states.${ONGOING}`)}</th>
            <th>{t(`states.${IN_REVIEW}`)}</th>
            <th>{t(`states.${DONE}`)}</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(tasks).map((task) => (
            <tr key={task.id}>
              {renderCell(PENDING, task)}
              {renderCell(ONGOING, task)}
              {renderCell(IN_REVIEW, task)}
              {renderCell(DONE, task)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
