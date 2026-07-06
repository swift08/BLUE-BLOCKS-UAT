"use client";

import { useState } from "react";

export default function AcademicsTabs({ data }) {
  const [activeTab, setActiveTab] = useState(data[0].id);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  const currentTab = data.find((t) => t.id === activeTab) || data[0];
  const currentSubItem = currentTab.items[activeSubIndex] || currentTab.items[0];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Left Sidebar Tabs */}
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        {data.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              suppressHydrationWarning
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveSubIndex(0); // Reset sub-tab
              }}
              className={`flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all ${
                isActive
                  ? "bg-[#FFF9F2] text-[#1F3B82] font-semibold"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {isActive && (
                  <div className="w-1 h-5 rounded-full bg-[#C2410C]" />
                )}
                <span className={isActive ? "text-[#1a1a1a]" : ""}>{tab.label}</span>
              </div>
              <span className="text-slate-300">→</span>
            </button>
          );
        })}
      </div>

      {/* Right Content Area */}
      <div className="w-full md:w-2/3 md:pl-6 md:border-l border-slate-100 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-6">{currentTab.title}</h3>
        
        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {currentTab.items.map((item, idx) => {
            const isSubActive = activeSubIndex === idx;
            return (
              <button
                type="button"
                suppressHydrationWarning
                key={idx}
                onClick={() => setActiveSubIndex(idx)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  isSubActive
                    ? "bg-[#C2410C] text-white border-[#C2410C] shadow-md shadow-[#C2410C]/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Details Box */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100 flex-1">
          <h4 className="text-sm font-bold text-slate-900 mb-3">{currentSubItem.label} Details</h4>
          <p className="text-slate-600 leading-relaxed text-sm">
            {currentSubItem.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
