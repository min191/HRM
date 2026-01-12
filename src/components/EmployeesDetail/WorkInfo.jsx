import React from 'react';

const WorkInfo = ({ employee }) => {
return (
<div className="p-6 bg-white dark:bg-surface-dark rounded-lg shadow-lg mt-6">
<h2 className="text-lg font-semibold text-text-main-dark dark:text-dark mb-4">Thông tin công tác</h2>

<div className="space-y-2">
<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Chức vụ:</strong> {employee.position}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Phòng ban:</strong> {employee.department}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Loại hợp đồng:</strong> {employee.contractType}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Ngày bắt đầu:</strong> {employee.startDate}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Trạng thái:</strong> {employee.status}</p>
</div>
</div>
</div>
);
};

export default WorkInfo;