// ========================================
// PROJECT MODALS
// ========================================

// เปิดหน้ารายละเอียด Project
function openProject(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.classList.add("is-open");

    // ป้องกันไม่ให้หน้าเว็บด้านหลังเลื่อน
    document.body.classList.add("modal-open");
}


// ปิดหน้ารายละเอียด Project
function closeProject(modalId) {

    const modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    modal.classList.remove("is-open");

    // ถ้าไม่มี Modal อื่นเปิดอยู่
    // ให้หน้าเว็บกลับมาเลื่อนได้ตามปกติ
    if (!document.querySelector(".project-modal.is-open")) {
        document.body.classList.remove("modal-open");
    }
}


// ========================================
// CLOSE MODAL WITH ESC
// ========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const openModal =
            document.querySelector(".project-modal.is-open");

        if (openModal) {
            closeProject(openModal.id);
        }


        // ถ้ามีรูป Preview เปิดอยู่
        const preview =
            document.querySelector(".image-preview");

        if (preview) {
            preview.remove();
        }

    }

});


// ========================================
// PROJECT IMAGE PREVIEW
// ========================================

// กดรูปใน Case Study แล้วขยายรูปใหญ่
document.addEventListener("click", function (event) {

    const image = event.target.closest(
        ".modal-gallery img, .modal-main-image"
    );

    if (!image) {
        return;
    }

    event.stopPropagation();


    // สร้างพื้นหลัง Preview
    const overlay = document.createElement("div");

    overlay.className = "image-preview";


    // สร้างรูปใหญ่
    const previewImage =
        document.createElement("img");

    previewImage.src = image.src;

    previewImage.alt =
        image.alt || "Project image";


    // ปุ่มปิด
    const closeButton =
        document.createElement("button");

    closeButton.className = "preview-close";

    closeButton.type = "button";

    closeButton.innerHTML = "&times;";


    // เอารูปกับปุ่มใส่ใน Overlay
    overlay.appendChild(previewImage);

    overlay.appendChild(closeButton);


    // แสดงบนหน้าเว็บ
    document.body.appendChild(overlay);


    // กด X เพื่อปิด
    closeButton.addEventListener(
        "click",
        function () {

            overlay.remove();

        }
    );


    // กดพื้นที่ดำรอบรูปเพื่อปิด
    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {
                overlay.remove();
            }

        }
    );

});