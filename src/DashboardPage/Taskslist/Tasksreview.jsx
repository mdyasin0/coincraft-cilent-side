import React from 'react';
import BuyerStats from './states';
import TaskListForWorker from '../TasklistForWorker';
import TaskToReview from './Taskstoreview';
import AdminStats from '../AdminStats';
import WithdrawRequest from '../WithdrawRequest';


const Tasksreview = () => {
    return (
        <div>
            <AdminStats />
            < WithdrawRequest></WithdrawRequest>
            <BuyerStats></BuyerStats>
            <TaskToReview></TaskToReview>
            <TaskListForWorker></TaskListForWorker>
        </div>
    );
};

export default Tasksreview;