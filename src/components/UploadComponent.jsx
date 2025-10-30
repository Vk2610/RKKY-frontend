import React, { useRef, useState, useEffect } from "react";

// UploadComponent.jsx
// Single-file React upload component with attractive UI (no Tailwind).
// Features:
// - Drag & drop area
// - File input fallback
// - Multi-file selection
// - Image previews and icons for documents
// - Validation (types, max size)
// - Remove file, clear all
// - Simulated upload with per-file progress and onUpload callback
// - Accessible (keyboard + ARIA)

export function handleUploadComplete(files) {
    console.log("Upload complete! Files:", files);
}

export default function UploadComponent({
  accept = [
    "image/*",
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".zip",
  ],
  maxFileSizeMB = 10,
  multiple = true,
  onUpload = (files) => {
    // files is an array of { file, url (preview), uploaded: true }
    console.log("Uploaded files:", files);
  },
}) {
  const [files, setFiles] = useState([]); // { id, file, preview, progress, status }
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const acceptAttr = accept.join(",");

  useEffect(() => {
    // clean up object URLs on unmount
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validateAndAdd(fileList) {
    const newEntries = [];
    const maxBytes = maxFileSizeMB * 1024 * 1024;

    for (const file of fileList) {
      // size check
      if (file.size > maxBytes) {
        alert(`${file.name} is larger than ${maxFileSizeMB} MB and was skipped.`);
        continue;
      }
      // type check — simple extension and MIME check
      const lower = file.name.toLowerCase();
      const isAcceptable = accept.some((a) => {
        if (a.endsWith("/*")) {
          const prefix = a.replace("/*", "");
          return file.type.startsWith(prefix);
        }
        return lower.endsWith(a.toLowerCase()) || file.type === a;
      });
      if (!isAcceptable) {
        alert(`${file.name} is not an accepted file type and was skipped.`);
        continue;
      }

      const id = Math.random().toString(36).slice(2, 9);
      const entry = {
        id,
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        progress: 0,
        status: "ready", // ready | uploading | done | error
      };
      newEntries.push(entry);
    }

    setFiles((prev) => (multiple ? [...prev, ...newEntries] : [...newEntries]));
  }

  function handleFilesSelected(e) {
    const fileList = e.target.files;
    if (!fileList) return;
    validateAndAdd(fileList);
    // reset input so same file can be reselected
    e.target.value = null;
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer?.files?.length) {
      validateAndAdd(e.dataTransfer.files);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function removeFile(id) {
    setFiles((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed && removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  function clearAll() {
    files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    setFiles([]);
  }

  // Simulate upload; Replace with real API integration
  function uploadAll() {
    const toUpload = files.filter((f) => f.status === "ready" || f.status === "error");
    if (!toUpload.length) return;

    const updated = files.map((f) => (toUpload.includes(f) ? { ...f, status: "uploading", progress: 0 } : f));
    setFiles(updated);

    toUpload.forEach((entry) => {
      simulateUpload(entry.id);
    });
  }

  function simulateUpload(id) {
    // increment progress over time
    const interval = setInterval(() => {
      setFiles((prev) => {
        return prev.map((p) => {
          if (p.id !== id) return p;
          const next = Math.min(100, p.progress + Math.round(Math.random() * 20));
          const updated = { ...p, progress: next };
          if (next >= 100) {
            clearInterval(interval);
            updated.status = "done";
          }
          return updated;
        });
      });
    }, 300 + Math.random() * 400);

    // After short delay call onUpload for success
    setTimeout(() => {
      // if all files done, call onUpload with final files
      setFiles((prev) => {
        const after = prev.map((p) => (p.id === id ? { ...p, status: "done", progress: 100 } : p));
        const allDone = after.every((x) => x.status === "done");
        if (allDone) {
          const result = after.map((r) => ({ file: r.file, url: r.preview, uploaded: true }));
          onUpload(result);
        }
        return after;
      });
    }, 1200 + Math.random() * 1600);
  }

  return (
    <div className="upload-root" style={rootStyle}>
      <style>{cssStyles}</style>
      <h3 style={titleStyle}>Smart Upload</h3>

      <div
        className={`dropzone ${dragActive ? "drag-active" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        aria-label="File upload dropzone"
      >
        <div className="drop-inner">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 15v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="drop-text">Drag & drop files here, or <button className="link" onClick={() => inputRef.current?.click()}>browse</button></p>
          <p className="muted">Images, PDFs, Word, Text, ZIP — up to {maxFileSizeMB} MB each</p>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            multiple={multiple}
            accept={acceptAttr}
            onChange={handleFilesSelected}
          />
        </div>
      </div>

      <div className="file-actions">
        <div>{files.length} file(s) selected</div>
        <div className="action-buttons">
          <button className="btn secondary" onClick={() => inputRef.current?.click()}>Add</button>
          <button className="btn" onClick={uploadAll} disabled={!files.some((f) => f.status === "ready" || f.status === "error")}>Upload</button>
          <button className="btn ghost" onClick={clearAll} disabled={!files.length}>Clear</button>
        </div>
      </div>

      <div className="file-list">
        {files.map((f) => (
          <div className="file-card" key={f.id}>
            <div className="thumb">
              {f.preview ? (
                <img src={f.preview} alt={f.file.name} />
              ) : (
                <div className="doc-icon" aria-hidden>
                  {renderDocIcon(f.file)}
                </div>
              )}
            </div>
            <div className="meta">
              <div className="name">{f.file.name}</div>
              <div className="size">{(f.file.size / 1024 / 1024).toFixed(2)} MB</div>
              <div className="progress-wrap">
                <div className={`progress ${f.status}`}> <div style={{ width: `${f.progress}%` }} className="bar" /></div>
                <div className="status">{renderStatus(f)}</div>
              </div>
            </div>
            <div className="controls">
              <button className="icon-btn" title="Remove" onClick={() => removeFile(f.id)}>&times;</button>
            </div>
          </div>
        ))}
        {!files.length && <div className="empty">No files selected yet — add files to get started.</div>}
      </div>

      <div className="hint">Tip: Press Enter while the drop area is focused to open the file browser.</div>
    </div>
  );
}

// ---------- Small helpers and styles ----------

function renderDocIcon(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case 'doc': case 'docx':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case 'zip':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M12 7v4M10 9h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
  }
}

function renderStatus(f) {
  if (f.status === 'ready') return 'Ready';
  if (f.status === 'uploading') return `Uploading — ${f.progress}%`;
  if (f.status === 'done') return 'Uploaded';
  if (f.status === 'error') return 'Error';
  return '';
}

// Inline styles + CSS string (kept in same file for single-file usage)
const rootStyle = {
  maxWidth: 820,
  margin: '18px auto',
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  color: '#111827',
};

const titleStyle = {
  margin: '0 0 12px 0',
  fontSize: 20,
};

const cssStyles = `
.upload-root { padding: 18px; background: linear-gradient(180deg, #ffffff, #fbfdff); border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); border: 1px solid rgba(15,23,42,0.04); }
.dropzone { border: 2px dashed rgba(99,102,241,0.14); border-radius: 10px; padding: 28px; text-align: center; cursor: pointer; transition: all 180ms ease; }
.dropzone.drag-active { background: linear-gradient(90deg, rgba(99,102,241,0.04), rgba(34,197,94,0.02)); box-shadow: 0 6px 22px rgba(99,102,241,0.06); border-color: rgba(99,102,241,0.32); }
.drop-inner { display:flex; flex-direction:column; gap:8px; align-items:center; justify-content:center; }
.drop-text { margin:0; font-weight:600; }
.muted { margin:0; font-size:13px; color:#6b7280; }
.link { background:none; border:none; color: #4f46e5; text-decoration:underline; cursor:pointer; font-weight:600; }
.file-actions { display:flex; justify-content:space-between; align-items:center; margin-top:14px; gap:14px; }
.action-buttons { display:flex; gap:8px; }
.btn { padding:8px 12px; border-radius:8px; border:none; background: linear-gradient(180deg,#4f46e5,#4338ca); color:white; font-weight:600; cursor:pointer; box-shadow: 0 6px 12px rgba(79,70,229,0.18); }
.btn[disabled] { opacity:0.5; cursor:not-allowed; }
.btn.secondary { background: linear-gradient(180deg,#fff,#f8fafc); color:#111; border:1px solid rgba(15,23,42,0.06); box-shadow:none; }
.btn.ghost { background:transparent; color:#374151; border:1px dashed rgba(55,65,81,0.06); }
.file-list { margin-top:16px; display:flex; flex-direction:column; gap:12px; }
.file-card { display:flex; gap:12px; padding:12px; border-radius:10px; align-items:center; border:1px solid rgba(15,23,42,0.04); background: #fff; }
.thumb { width:64px; height:64px; border-radius:8px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#f8fafc,#ffffff); border:1px solid rgba(15,23,42,0.03); }
.thumb img { width:100%; height:100%; object-fit:cover; }
.meta { flex:1; min-width:0; }
.name { font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.size { font-size:12px; color:#6b7280; margin-top:4px; }
.progress-wrap { margin-top:8px; display:flex; align-items:center; gap:12px; }
.progress { height:8px; width:260px; background: #eef2ff; border-radius:999px; overflow:hidden; position:relative; }
.progress .bar { height:100%; width:0%; background: linear-gradient(90deg,#60a5fa,#4f46e5); transition: width 240ms linear; }
.status { font-size:12px; color:#6b7280; min-width:78px; }
.controls { display:flex; gap:8px; }
.icon-btn { background:transparent; border:none; font-size:20px; cursor:pointer; color:#9ca3af; }
.empty { padding:26px; text-align:center; color:#6b7280; }
.hint { margin-top:12px; font-size:13px; color:#6b7280; }
@media (max-width:700px) { .progress { width:140px; } }
`;
