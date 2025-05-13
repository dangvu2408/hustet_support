import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const childManagement = [
    "Khoa Điện tử",
    "Khoa Kỹ thuật truyền thông",
    "Trung tâm Đào tạo thực hành Điện - Điện tử"
];

function AddCourseField() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // Form fields
    const [courseId, setCourseId] = useState("");
    const [courseName, setCourseName] = useState("");
    const [englishName, setEnglishName] = useState("");
    const [managingDepartment, setManagingDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("Miễn phí");
    const [thumbnail, setThumbnail] = useState("");

    const [value, setValue] = useState("");
    

    const [open, setOpen] = useState(false);
    // Dropdown custom multi-select
    const [selected, setSelected] = useState([]);
    const handleToggle = (item) => {
        setSelected((prev) =>
          prev.includes(item)
            ? prev.filter((i) => i !== item)
            : [...prev, item]
        );
    };

    // Textarea auto-height
    const textareaRef = useRef(null);
    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = "auto"; 
        textarea.style.height = textarea.scrollHeight + "px"; 
    };

    // Weight-related fields
    const [credit, setCredit] = useState("");
    const [timeLT, setTimeLT] = useState("");
    const [timeTH, setTimeTH] = useState("");
    const [timeBT, setTimeBT] = useState("");
    const [timeTU, setTimeTU] = useState("");
    const [weight, setWeight] = useState("0(0-0-0-0)");

    useEffect(() => {
        const c = credit || 0;
        const lt = timeLT || 0;
        const bt = timeBT || 0;
        const th = timeTH || 0;
        const tu = timeTU || 0;
        setWeight(`${c}(${lt}-${bt}-${th}-${tu})`);
    }, [credit, timeLT, timeTH, timeBT, timeTU]);

    // Char count
    const [charCounts, setCharCounts] = useState({});
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCharCounts(prev => ({
            ...prev,
            [id]: value.length
        }));
    };

    // Thumbnail upload preview
    const fileInputRef = useRef(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setBackgroundImage(event.target.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:3001/upload-thumbnail", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data?.url) {
            setThumbnail(data.url);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            course_id: courseId,
            course_name: courseName,
            english_name: englishName,
            child_management: selected.join(", "),
            managing_department: "Trường Điện - Điện tử",
            weight,
            description: value,
            price,
            thumbnail
        };

        const res = await fetch("http://localhost:3001/add-course", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log("Course added:", data);
        navigate("/courses");
    };

    
    return(
        <main id="main">
            <div className="container_et">
                <div className="container_heading">
                    <a href="#" className="back_home" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                        <span className="subtitle_back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            <span>Quay lại</span>
                        </span>
                    </a>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="wrapper_container">
                        <div className="row_wrapper">
                            <div className="col_wrapper col_left">
                                <div className="course_content">
                                    <h1 className="course_name_heading">Thêm môn học mới</h1>
                                    <div className="form_group ">
                                        <label htmlFor="title">Tên học phần <span class="required">(bắt buộc)</span>
                                            <span class="tooltip" title="Nhập tên học phần.">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <input type="text" id="course_name_input" maxlength="100" placeholder="Nhập tên học phần..." value={courseName} onChange={(e) => {handleInputChange(e); setCourseName(e.target.value)}}></input>
                                        <span class="char-count" id="char-count-name">{charCounts['course_name_input'] || 0}/100</span>
                                    </div>

                                    <div className="form_group ">
                                        <label htmlFor="title">Mã học phần <span class="required">(bắt buộc)</span>
                                            <span class="tooltip" title="Nhập mã học phần.">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <input type="text" id="course_id_input" maxlength="10" placeholder="Nhập mã học phần..." value={courseId} onChange={(e) => {handleInputChange(e); setCourseId(e.target.value)}}></input>
                                        <span class="char-count" id="char-count">{charCounts['course_id_input'] || 0}/10</span>
                                    </div>

                                    <div className="form_group ">
                                        <label htmlFor="title">Tên tiếng Anh <span class="required">(bắt buộc)</span>
                                            <span class="tooltip" title="Nhập tên học phần bằng tiếng Anh.">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <input type="text" id="course_enname_input" maxlength="100" placeholder="Nhập tên học phần bằng tiếng Anh..." value={englishName} onChange={(e) => {handleInputChange(e); setEnglishName(e.target.value)}}></input>
                                        <span class="char-count" id="char-count">{charCounts['course_enname_input'] || 0}/100</span>
                                    </div>

                                    <div className="form_group course_des_input">
                                        <label htmlFor="title">Mô tả học phần
                                            <span class="tooltip" title="Nhập mô tả học phần">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <textarea ref={textareaRef} value={value} onChange={(e) => { setValue(e.target.value); handleInput(); handleInputChange(e); }} type="text" id="course_des_input" maxlength="5000" placeholder="Nhập mô tả học phần..." ></textarea>
                                        <span class="char-count" id="char-count">{charCounts['course_des_input'] || 0}/5000</span>
                                    </div>

                                    <div className="form_group read_only_group">
                                        <label htmlFor="title">Đơn vị quản lý <span class="required">(bắt buộc)</span>
                                            <span class="tooltip" title="Tên đơn vị quản lý học phần">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <input type="text" id="course_enname_input" maxlength="100" placeholder="Trường Điện - Điện tử" readOnly></input>
                                    </div>

                                    <div className="form_group">
                                        <label htmlFor="title">Đơn vị con <span class="required">(bắt buộc)</span>
                                            <span class="tooltip" title="Tên đơn vị con quản lý học phần">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            </span>
                                        </label>
                                        <div className="dropdown-container">
                                            <button onClick={() => setOpen(!open)} type="button" className="dropdown-button">
                                                {selected.length > 0 ? `${selected.length} đơn vị con` : "Chọn đơn vị con..."}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`feather feather-chevron-down ${open ? "rotate" : ""}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </button>
                                            {open && (
                                                <div className="dropdown_menu">
                                                    <div className="checkbox-list">
                                                        {childManagement.map((item) => (
                                                            <label key={item} className="checkbox-item">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selected.includes(item)}
                                                                    onChange={() => handleToggle(item)} />
                                                                {item}
                                                            </label>
                                                        ))}
                                                    </div>

                                                    <div className="dropdown-footer">
                                                        <button onClick={() => setOpen(false)} className="done-btn">
                                                            Xong
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <span className="course_weight">Khối lượng học phần</span>

                                    <div className="two_columns_child">
                                        <div className="col_wrapper col_left_5">
                                            <div className="form_content_left">
                                                <div className="form_group">
                                                    <label htmlFor="title">Số tín chỉ <span class="required">(bắt buộc)</span>
                                                        <span class="tooltip" title="Nhập số tín chỉ của học phần.">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_credit_input" maxlength="10" placeholder="Nhập số tín chỉ học phần..." value={credit} onChange={(e) => setCredit(e.target.value)}></input>
                                                </div>

                                                <div className="form_group">
                                                    <label htmlFor="title">Số giờ LT <span class="required">(bắt buộc)</span>
                                                        <span class="tooltip" title="Nhập số giờ học lý thuyết của học phần.">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_time1_input" maxlength="10" placeholder="Nhập số giờ LT của học phần..." value={timeLT} onChange={(e) => setTimeLT(e.target.value)}></input>
                                                </div>

                                                <div className="form_group">
                                                    <label htmlFor="title">Số giờ TH/TN <span class="required">(bắt buộc)</span>
                                                        <span class="tooltip" title="Nhập số giờ thực hành và thí nghiệm của học phần.">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_time3_input" maxlength="10" placeholder="Nhập số giờ TH/TN của học phần..." value={timeTH} onChange={(e) => setTimeTH(e.target.value)}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col_wrapper col_right_5">
                                            <div className="form_content_right">
                                                <div className="form_group read_only_group">
                                                    <label htmlFor="title">Phân bổ khối lượng
                                                        <span class="tooltip" title="Khối lượng của học phần x(y-z-t-m).">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_weight_input" maxlength="10" placeholder="Phân bổ khối lượng học phần..." readOnly value={weight}></input>
                                                </div>

                                                <div className="form_group">
                                                    <label htmlFor="title">Số giờ BT <span class="required">(bắt buộc)</span>
                                                        <span class="tooltip" title="Nhập số giờ học bài tập của học phần.">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_time2_input" maxlength="10" placeholder="Nhập số giờ BT của học phần..." value={timeBT} onChange={(e) => setTimeBT(e.target.value)}></input>
                                                </div>

                                                <div className="form_group">
                                                    <label htmlFor="title">Số giờ tự học <span class="required">(bắt buộc)</span>
                                                        <span class="tooltip" title="Nhập số giờ tự học của học phần.">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                        </span>
                                                    </label>
                                                    <input type="text" id="course_time4_input" maxlength="10" placeholder="Nhập số giờ tự học của học phần..." value={timeTU} onChange={(e) => setTimeTU(e.target.value)}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>            

                                </div>
                            </div>
                            <div className="col_wrapper col_right">
                                <div className="purchase_badge">
                                    <div className="img_preview">
                                        <div className="background_igm_prv" style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none"}}></div>
                                        <p className="showMoreCourse" style={{ cursor: 'pointer'}} onClick={handleUploadClick}>Tải hình thu nhỏ mô tả học phần</p>
                                        <div className="upload_button" onClick={handleUploadClick}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <div class="radio_group">
                                        <label class="radio_option">
                                            <input type="radio" name="kid_content" defaultChecked={true}/>
                                            <span class="custom_radio"></span>
                                            Khóa học miễn phí
                                        </label>

                                        <label class="radio_option">
                                            <input type="radio" name="kid_content"  />
                                            <span class="custom_radio"></span>
                                            Khóa học có tính phí (299.000 VNĐ)
                                        </label>
                                    </div>

                                    <div class="info_box_container">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                        <span aria-hidden className="text_info_box">Đối với những khóa học có tính phí, phí khóa học mặc định luôn là 299.000 VNĐ</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer_level">
                            <button className="add_course_button" type="submit">Thêm môn học</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );

}

export default AddCourseField;