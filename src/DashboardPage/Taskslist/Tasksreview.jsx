import React from 'react';
import BuyerStats from './states';
import TaskListForWorker from '../TasklistForWorker';
import TaskToReview from './Taskstoreview';


const Tasksreview = () => {
    return (
        <div>
            <BuyerStats></BuyerStats>
            <TaskToReview></TaskToReview>
            <TaskListForWorker></TaskListForWorker>
        </div>
    );
};

export default Tasksreview;