if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

function updateClock() {
    const now = new Date();

    document.getElementById("currentTime").innerText =
        now.toLocaleTimeString("vi-VN");
}

setInterval(updateClock, 1000);
updateClock();

function checkIn() {

    const now = new Date();

    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];

    attendance.push({

        date:
            now.toLocaleDateString(
                "vi-VN"
            ),

        checkIn:
            now.toLocaleTimeString(
                "vi-VN"
            ),

        checkOut: "--:--"

    });

    localStorage.setItem(
        "attendanceHistory",
        JSON.stringify(attendance)
    );

    document.getElementById(
        "checkInTime"
    ).innerText =
        now.toLocaleTimeString(
            "vi-VN"
        );

    loadAttendanceHistory();

    alert(
        "Check In thành công!"
    );
}

function checkOut() {

    const now = new Date();

    let attendance =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];

    for (
        let i =
            attendance.length - 1;
        i >= 0;
        i--
    ) {

        if (
            attendance[i]
                .checkOut === "--:--"
        ) {

            attendance[i].checkOut =
                now.toLocaleTimeString(
                    "vi-VN"
                );

            break;
        }
    }

    localStorage.setItem(
        "attendanceHistory",
        JSON.stringify(attendance)
    );

    document.getElementById(
        "checkOutTime"
    ).innerText =
        now.toLocaleTimeString(
            "vi-VN"
        );

    loadAttendanceHistory();

    alert(
        "Check Out thành công!"
    );
}

function loadAttendanceHistory() {

    const table =
        document.getElementById(
            "attendanceTable"
        );

    table.innerHTML = "";

    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];

    attendance
        .slice()
        .reverse()
        .forEach(item => {

            const row =
                table.insertRow();

            row.insertCell(0)
                .innerText =
                item.date;

            row.insertCell(1)
                .innerText =
                item.checkIn;

            row.insertCell(2)
                .innerText =
                item.checkOut;
        });
}

function submitLeave() {

    const startDate =
        document.getElementById(
            "startDate"
        ).value;

    const endDate =
        document.getElementById(
            "endDate"
        ).value;

    const reason =
        document.getElementById(
            "reason"
        ).value.trim();

    if (
        startDate === "" ||
        endDate === "" ||
        reason === ""
    ) {

        alert(
            "Vui lòng nhập đầy đủ thông tin."
        );

        return;
    }

    const leave = {

        employee:
            localStorage.getItem(
                "userName"
            ) || "Nhân viên",

        startDate,
        endDate,
        reason,

        status: "Chờ duyệt",

        note: ""
    };

    let leaves =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    leaves.push(leave);

    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(leaves)
    );

    document.getElementById(
        "startDate"
    ).value = "";

    document.getElementById(
        "endDate"
    ).value = "";

    document.getElementById(
        "reason"
    ).value = "";

    loadLeaveRequests();

    alert(
        "Gửi đơn thành công!"
    );
}

function loadLeaveRequests() {

    const table =
        document.getElementById(
            "leaveTable"
        );

    table.innerHTML = "";

    const leaves =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    let pending = 0;

    leaves.forEach(
        (leave, index) => {

            if (
                leave.status ===
                "Chờ duyệt"
            ) {
                pending++;
            }

            const row =
                table.insertRow();

            row.insertCell(0).innerText =
                leave.startDate;

            row.insertCell(1).innerText =
                leave.endDate;

            row.insertCell(2).innerText =
                leave.reason;

            row.insertCell(3).innerHTML = `
                <div>
                    <strong>${leave.status}</strong>
                    <br>
                    <small>${leave.note || ""}</small>
                </div>
            `;

            if (
                leave.status ===
                "Chờ duyệt"
            ) {

                row.insertCell(4).innerHTML = `
                    <button
                        class="cancel-btn"
                        onclick="cancelLeave(${index})">
                        Hủy
                    </button>
                `;

            } else {

                row.insertCell(4).innerHTML =
                    "-";
            }
        }
    );

    document.getElementById(
        "pendingRequest"
    ).innerText = pending;
}

function cancelLeave(index) {

    if (
        !confirm(
            "Bạn có muốn hủy đơn này không?"
        )
    ) {
        return;
    }

    let leaves =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    leaves.splice(index, 1);

    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(leaves)
    );

    loadLeaveRequests();
}

function loadAttendanceHistory() {

    const table =
        document.getElementById(
            "attendanceTable"
        );

    if (!table) return;

    table.innerHTML = "";

    const attendance =
        JSON.parse(
            localStorage.getItem(
                "attendanceHistory"
            )
        ) || [];

    attendance
        .slice(-7)
        .reverse()
        .forEach(item => {

            const row =
                table.insertRow();

            row.insertCell(0).innerText =
                item.date;

            row.insertCell(1).innerText =
                item.checkIn;

            row.insertCell(2).innerText =
                item.checkOut;
        });
}

function scrollToSection(event, sectionId) {

    document
        .getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    const menuItems =
        document.querySelectorAll(
            ".sidebar li"
        );

    menuItems.forEach(item => {
        item.classList.remove(
            "active"
        );
    });

    event.target.classList.add(
        "active"
    );
}

function logout() {

    if (
        confirm(
            "Bạn có muốn đăng xuất không?"
        )
    ) {

        sessionStorage.removeItem(
            "isLoggedIn"
        );

        window.location.href =
            "login.html";
    }
}

const savedCheckIn =
    localStorage.getItem(
        "checkInTime"
    );

if (savedCheckIn) {

    document.getElementById(
        "checkInTime"
    ).innerText =
        savedCheckIn;
}

const savedCheckOut =
    localStorage.getItem(
        "checkOutTime"
    );

if (savedCheckOut) {

    document.getElementById(
        "checkOutTime"
    ).innerText =
        savedCheckOut;
}

loadLeaveRequests();
loadAttendanceHistory();