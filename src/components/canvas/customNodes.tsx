import React from "react";

export const StartNode = ({data}:any) => {
  return <div style={{padding:8, borderRadius:8, background:'#dff7e3', border:'1px solid #a8e0b9'}}>🚦 {data.title || "Start"}</div>;
};

export const TaskNode = ({data}:any) => {
  return <div style={{padding:8, borderRadius:8, background:'#fff9db', border:'1px solid #f0e6a9'}}>📝 {data.title || "Task"}</div>;
};

export const ApprovalNode = ({data}:any) => {
  return <div style={{padding:8, borderRadius:8, background:'#e6f0ff', border:'1px solid #cddff8'}}>✅ {data.title || "Approval"}</div>;
};

export const AutomatedNode = ({data}:any) => {
  return <div style={{padding:8, borderRadius:8, background:'#f2e9ff', border:'1px solid #ddc9f6'}}>🤖 {data.title || "Automated"}</div>;
};

export const EndNode = ({data}:any) => {
  return <div style={{padding:8, borderRadius:8, background:'#ffecec', border:'1px solid #f2c4c4'}}>🏁 {data.title || "End"}</div>;
};
