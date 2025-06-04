import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';
import Dialog from './dialog/CourseDialog';


function CourseDocumentField({
    course_id
}) {
    const[showDialog, setShowDialog] = useState(false);
    const openDialog = () => setShowDialog(true);
    const closeDialog = () => setShowDialog(false);
    

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
                    <form method="post" id="loginForm">
                        <div className="form_area__">
                            <div className="pass_update_field">
                                <label id="pass_label">Nhập mật khẩu cũ</label>
                            </div>

                            <div className="pass_update_field">
                                <label id="pass_label">Nhập mật khẩu mới</label>
                            </div>

                            <div className="info_box_container update_box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                <span>Đổi mật khẩu và đăng nhập lại</span>
                            </div>

                            <div className="btnupdate">
                                <div className="form_update_btn">
                                    <button id="idBtnUpdate" className="updateform_btn" type="submit" >Thêm tài liệu</button>
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