// // DataSourcePanel.tsx
// import React from 'react';

// interface DataSourcePanelProps {
//   sources: string[];
//   current: string;
//   onChange: (source: string) => void;
// }

// const DataSourcePanel: React.FC<DataSourcePanelProps> = ({ sources, current, onChange }) => {
//   return (
//     <div className="absolute z-20 top-4 left-4 bg-white p-3 rounded-md shadow-lg">
//       <div className="text-lg font-semibold mb-2 text-gray-700">遥感数据</div>
//       {sources.map((source) => (
//         <div
//           key={source}
//           className="flex items-center p-2 hover:bg-blue-50 rounded cursor-pointer"
//           onClick={() => onChange(source)}
//         >
//           <div className={`w-5 h-5 border rounded-sm mr-2 flex items-center justify-center 
//             ${current === source ? 'bg-blue-500 border-blue-500' : 'border-gray-400'}`}>
//             {current === source && (
//               <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             )}
//           </div>
//           <span className="text-gray-700">{source}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DataSourcePanel;