import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';
import Dialog from './dialog/CourseDialog';


function CourseDocumentField({
    course_id, username
}) {
    const[showDialog, setShowDialog] = useState(false);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
            "application/vnd.ms-powerpoint", // .ppt
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Chỉ hỗ trợ các định dạng PDF, DOC, DOCX, PPT, PPTX.");
            return;
        }

        setSelectedFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        fileInputRef.current.value = null;
    };

    const getFileIcon = () => {
        if (!selectedFile) return null;

        const name = selectedFile.name.toLowerCase();

        if (name.endsWith(".pdf")) return "pdf";
        if (name.endsWith(".doc") || name.endsWith(".docx")) return "word";
        if (name.endsWith(".ppt") || name.endsWith(".pptx")) return "ppt";

        return "default";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            alert("Vui lòng chọn tài liệu cần tải lên.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("course", course_id);
        formData.append("doc_author", username);
        const filename = selectedFile.name;
        const title = filename.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        formData.append("title", title);
        const extension = filename.split('.').pop(); // ví dụ: "pptx"
        formData.append("type_doc", extension);


        try {
            const response = await fetch("http://localhost:3001/upload-document", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Tải lên thành công!");
                setSelectedFile(null); 
                closeDialog(); 
            } else {
                alert(result.error || "Lỗi khi upload.");
            }
        } catch (err) {
            console.error("Lỗi khi gửi dữ liệu:", err);
            alert("Không thể kết nối đến máy chủ.");
        }
    }

    return(
        <div className="document_field">
            <h1 className="course_doc_title">Tài liệu môn học</h1>
            <div className="list_of_doc">
                
            </div>
            <div className="upload_doc_level">
                <h1 className="course_doc_title">Đóng góp tài liệu</h1>
                <div className="add_doc">
                    <button className="add_doc_btn" type="button" onClick={openDialog}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                        <span>Thêm tài liệu</span>
                    </button>   
                </div>
            </div>

            <Dialog show={showDialog} onClose={closeDialog} title="Thêm tài liệu">
                <div className="group_items_info">
                    <form method="post" id="loginForm" onSubmit={handleSubmit}>
                        <div className="form_area__">
                            <div className="upload_document_btn" onClick={handleUploadClick}>
                                <span id="pass_label">Tải lên tài liệu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {selectedFile && (
                                <div className="queue_doc_upload">
                                    {getFileIcon() === "pdf" && (
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M17 18h2" /><path d="M20 15h-3v6" /><path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" /></svg>
                                    )}
                                    {getFileIcon() === "word" && (
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-docx"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M2 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" /><path d="M17 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" /><path d="M9.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" /><path d="M19.5 15l3 6" /><path d="M19.5 21l3 -6" /></svg>
                                    )}
                                    {getFileIcon() === "ppt" && (
                                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-ppt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M11 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M16.5 15h3" /><path d="M18 15v6" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /></svg>
                                    )}
                                    <span>{selectedFile.name}</span>
                                    <svg onClick={handleRemoveFile} style={{cursor: "pointer"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#000" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </div>
                            )}

                            <div className="info_box_container update_box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                <div>
                                    <span>Chú ý: Chỉ được upload mỗi lần 1 tài liệu</span> <br></br>
                                    <span>Chấp nhận tài liệu có định dạng .pdf; .docx; .doc; .pptx; .ppt</span>
                                </div>
                            </div>

                            <div className="btnupdate">
                                <div className="form_update_btn">
                                    <button id="idBtnUpdate" className="updateform_btn" type="submit">Thêm tài liệu</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}

export default CourseDocumentField;