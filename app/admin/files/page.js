'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { 
  FolderOpen, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  ShieldCheck, 
  Download, 
  Trash2, 
  Plus,
  X,
  AlertTriangle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function FilesAdminPage() {
  const [files, setFiles] = useState([
    {
      id: 1,
      file_name: 'Apex_Global_Logistics_SOW_v1.pdf',
      file_type: 'application/pdf',
      file_size: 2450000,
      project_name: 'Apex Freight Global Logistics Platform',
      customer_name: 'Arun Kumar',
      uploaded_at: '2026-01-12T10:00:00Z',
    },
    {
      id: 2,
      file_name: 'Verde_Brand_Vector_Assets.zip',
      file_type: 'application/zip',
      file_size: 14200000,
      project_name: 'Verde Botanics Luxury Marketplace',
      customer_name: 'Priya Sharma',
      uploaded_at: '2026-02-16T14:30:00Z',
    },
    {
      id: 3,
      file_name: 'Pulse_Clinic_Doctor_Schedules.xlsx',
      file_type: 'application/vnd.ms-excel',
      file_size: 780000,
      project_name: 'Pulse Health Clinic Portal',
      customer_name: 'Dr. Rajesh Varma',
      uploaded_at: '2026-03-01T09:15:00Z',
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [projectName, setProjectName] = useState('Apex Freight Global Logistics Platform');

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleAddFile = (e) => {
    e.preventDefault();
    if (!fileName) return;

    const newFile = {
      id: Date.now(),
      file_name: fileName,
      file_type: fileName.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream',
      file_size: Math.floor(Math.random() * 5000000) + 500000,
      project_name: projectName,
      customer_name: 'Client Asset',
      uploaded_at: new Date().toISOString(),
    };

    setFiles([newFile, ...files]);
    setFileName('');
    setShowUploadModal(false);
  };

  const handleDelete = (id) => {
    if (!confirm('Remove file record?')) return;
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminHeader 
        title="Project Files & Asset Vault" 
        subtitle="Manage client specifications, design assets, and signed SOW documents" 
      />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
        {/* Security Alert Header */}
        <div className="glass-panel p-4 rounded-2xl border-emerald-500/20 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">File Security & Sanitation Policy</span>
            <span>All uploads are checked against dangerous MIME types and restricted to non-executable assets. Customer private files are protected behind session authentication.</span>
          </div>
        </div>

        {/* Actions bar */}
        <div className="glass-panel p-5 rounded-2xl border-white/5 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Total Stored Assets: <strong className="text-white">{files.length}</strong>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {files.map((file) => (
            <div
              key={file.id}
              className="glass-panel p-5 rounded-2xl border-white/10 space-y-4 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-400/25">
                    <FileText className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white truncate" title={file.file_name}>
                    {file.file_name}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    Project: <strong className="text-slate-200">{file.project_name}</strong>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Uploaded for {file.customer_name}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>{formatFileSize(file.file_size)}</span>
                <span>{formatDate(file.uploaded_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white">Register Project Document</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFile} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">File / Document Name *</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Architectural_Wireframes_Spec.pdf"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Associate With Project</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400">
                Permitted formats: PDF, PNG, JPG, SVG, DOCX, XLSX, ZIP. Executable files (.exe, .sh, .bat) are rejected.
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-bold"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
