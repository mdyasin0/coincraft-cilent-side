import React from 'react';
import TaskListForWorker from '../TasklistForWorker';
import WorkerStats from './Workerstate';
import ApprovedSubmissions from '../ApprovedSubmissions';

const Taskreviewforworker = () => {
    return (
        <div>
            <WorkerStats></WorkerStats>
            <ApprovedSubmissions></ApprovedSubmissions>
            <TaskListForWorker></TaskListForWorker>
        </div>
    );
};

export default Taskreviewforworker;