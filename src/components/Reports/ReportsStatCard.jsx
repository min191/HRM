import React from "react";

export default function ReportsStatCard({ title, value }) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-black mt-1 text-primary">{value}</h3>
    </div>
  );
}
