import React from 'react';

const EducationInfo = ({ employee }) => {
return (
<div className="p-6 bg-white dark:bg-surface-dark rounded-lg shadow-lg mt-6">
<h2 className="text-lg font-semibold text-text-main-dark dark:text-dark mb-4">Trình độ chuyên môn</h2>

<div className="space-y-2">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Trình độ/Bằng cấp:</strong> {employee.education}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Trường đào tạo:</strong> {employee.school}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Năm tốt nghiệp:</strong> {employee.graduationYear}</p>
</div>
</div>
);
};

export default EducationInfo;