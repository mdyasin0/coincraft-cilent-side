import React from 'react';
import BuyerStats from './states';
import TaskListForWorker from '../TasklistForWorker';

const Tasksreview = () => {
    return (
        <div>
            <BuyerStats></BuyerStats>
            <TaskListForWorker></TaskListForWorker>
        </div>
    );
};

export default Tasksreview;