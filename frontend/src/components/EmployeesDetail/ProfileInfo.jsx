import React from 'react';

const ProfileInfo = ({ employee }) => {
return (
<div className="p-6 bg-white dark:bg-surface-dark rounded-lg shadow-lg mt-6">
<h2 className="text-lg font-semibold text-text-main-dark dark:text-dark mb-4">Thông tin cá nhân</h2>

<div className="space-y-2">
<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Họ và tên:</strong> {employee.name}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Mã nhân viên:</strong> {employee.employeeId}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Ngày sinh:</strong> {employee.dob}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Giới tính:</strong> {employee.gender}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Địa chỉ:</strong> {employee.address}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Số điện thoại:</strong> {employee.phone}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Email:</strong> {employee.email}</p>
</div>
</div>
</div>
);
};

export default ProfileInfo;