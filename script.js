// ========================================
// PROJECT MODALS
// ========================================

function openProject(modalId) {
    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
}

function closeProject(modalId) {
    const modal = document.getElementById(modalId);

    if (!modal) return;

    modal.classList.remove("is-open");

    if (!document.querySelector(".project-modal.is-open")) {
        document.body.classList.remove("modal-open");
    }
}


// ========================================
// MOBILE HAMBURGER MENU
// ========================================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.getElementById("mobileMenuClose");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

function openMobileMenu() {
    if (!menuToggle || !mobileMenu || !mobileMenuOverlay) return;

    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");

    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
}

function closeMobileMenu() {
    if (!mobileMenu || !mobileMenuOverlay) return;

    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");

    mobileMenu.setAttribute("aria-hidden", "true");

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("menu-open");
}


// กดปุ่มสามขีด
if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        if (mobileMenu.classList.contains("active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}


// กด X เพื่อปิดเมนู
if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu);
}


// กดพื้นหลังดำเพื่อปิดเมนู
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
}


// กดลิงก์ในเมนูแล้วปิด Drawer อัตโนมัติ
document.querySelectorAll(".mobile-menu-links a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
});


// ========================================
// CLOSE WITH ESC
// ========================================

document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    // ปิด Mobile Menu
    if (mobileMenu && mobileMenu.classList.contains("active")) {
        closeMobileMenu();
    }

    // ปิด Project Modal
    const openModal = document.querySelector(".project-modal.is-open");

    if (openModal) {
        closeProject(openModal.id);
    }

    // ปิด Image Preview
    const preview = document.querySelector(".image-preview");

    if (preview) {
        preview.remove();
    }
});


// ========================================
// PROJECT IMAGE PREVIEW
// ========================================

document.addEventListener("click", function (event) {
    const image = event.target.closest(
        ".modal-gallery img, .modal-main-image"
    );

    if (!image) return;

    event.stopPropagation();

    const overlay = document.createElement("div");
    overlay.className = "image-preview";

    const previewImage = document.createElement("img");
    previewImage.src = image.src;
    previewImage.alt = image.alt || "Project image";

    const closeButton = document.createElement("button");
    closeButton.className = "preview-close";
    closeButton.type = "button";
    closeButton.innerHTML = "&times;";

    overlay.appendChild(previewImage);
    overlay.appendChild(closeButton);

    document.body.appendChild(overlay);


    // กด X เพื่อปิดรูป
    closeButton.addEventListener("click", function () {
        overlay.remove();
    });


    // กดพื้นที่รอบรูปเพื่อปิด
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
});


// ========================================
// RESET MENU WHEN DESKTOP
// ========================================

window.addEventListener("resize", function () {
    if (window.innerWidth > 600) {
        closeMobileMenu();
    }
});