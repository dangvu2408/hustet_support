import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Premium from './Premium';
import Plus from './Plus';
import Basic from './Basic';
import { type } from "@testing-library/user-event/dist/type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";

function DocumentItem({
    title,
    upload_date,
    type_doc,
    doc_author, 
}) {

    const [authorInfo, setAuthorInfo] = useState(null);
    dayjs.extend(relativeTime);
    dayjs.locale('vi');

    const uploadTime = dayjs(upload_date);
    const now = dayjs();
    const result = uploadTime.from(now);


    useEffect(() => {
        const fetchAuthorInfo = async () => {
            try {
                const res = await axios.get("/get-userinfo", {
                    params: { username: doc_author } 
                });
                setAuthorInfo(res.data);
            } catch (err) {
                console.error("Lỗi lấy thông tin author:", err);
            }
        };
    
        fetchAuthorInfo();
    }, [doc_author]);


    return (
        <div className="document_item_50">
            {type_doc === "pdf" && (
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M17 18h2" /><path d="M20 15h-3v6" /><path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" /></svg>
            )}
            {(type_doc === "docx" || type_doc === "doc") && (
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-docx"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M2 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" /><path d="M17 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" /><path d="M9.5 15a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1 -3 0v-3a1.5 1.5 0 0 1 1.5 -1.5z" /><path d="M19.5 15l3 6" /><path d="M19.5 21l3 -6" /></svg>
            )}
            {(type_doc === "pptx" || type_doc === "ppt") && (
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-ppt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M11 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M16.5 15h3" /><path d="M18 15v6" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /></svg>
            )}
            <div className='doc_info'>
                <div className="document_title">
                    <span>{title}</span>
                </div>
                <div className="document_author_time">
                    {authorInfo && (
                        <span>{authorInfo.fullname} • {result}</span>
                    )}
                </div>
            </div>
            <button className="download_btn" type="button">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24px"  height="24px"  viewBox="0 0 24 24"  fill="none"  stroke="#000"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </button>
        </div>
    );
}

export default DocumentItem;