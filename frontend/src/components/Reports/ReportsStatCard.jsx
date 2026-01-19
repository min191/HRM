import React from "react";

export default function ReportsStatCard({ title, value }) {
  return (
    <div
      className={`p-4 border rounded-xl bg-white border-slate-200 shadow-sm 
                  transition duration-300 ease-in-out
                  hover:border-primary hover:shadow-lg`}
    >
      <p className="text-xs uppercase text-slate-500 font-medium tracking-wide">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1 text-slate-800 transition-colors duration-300 ease-in-out hover:text-primary">
        {value}
      </p>
    </div>
  );
}
