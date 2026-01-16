import React, { useState } from 'react';

const SocialInfo = ({ employee }) => {
const [isPartyMember, setIsPartyMember] = useState(employee.youthUnionMember);

const handleYouthUnionToggle = () => {
setIsPartyMember(!isPartyMember);
};

return (
<div className="p-6 bg-white dark:bg-surface-dark rounded-lg shadow-lg mt-6">
<h2 className="text-lg font-semibold text-text-main-dark dark:text-dark mb-4">Thông tin chính trị - xã hội</h2>

<div className="space-y-4">
<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Đảng viên:</strong> {employee.politicalStatus}</p>
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Ngày vào Đảng:</strong> {employee.politicalPartyDate}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Đoàn viên:</strong></p>
<label className="flex items-center cursor-pointer">
<input
type="checkbox"
checked={isPartyMember}
onChange={handleYouthUnionToggle}
className="sr-only peer"
/>
<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Ngày vào Đoàn:</strong> {employee.youthUnionDate}</p>
</div>

<div className="flex justify-between">
<p className="text-sm text-text-muted dark:text-gray-400"><strong>Diện chính sách:</strong> {employee.policyStatus}</p>
</div>
</div>
</div>
);
};

export default SocialInfo;