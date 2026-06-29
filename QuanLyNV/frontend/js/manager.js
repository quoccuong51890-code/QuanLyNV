if (
    sessionStorage.getItem("isLoggedIn") !== "true"
) {
    window.location.href = "login.html";
}

function scrollToSection(sectionId) {

    document
        .getElementById(sectionId)
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}

function logout() {

    const confirmLogout =
        confirm("Bạn có muốn đăng xuất không?");

    if (confirmLogout) {

        sessionStorage.removeItem(
            "isLoggedIn"
        );

        window.location.href =
            "login.html";
    }
}

function loadLeaveRequests() {

    const table =
        document.getElementById(
            "requestTable"
        );

    table.innerHTML = "";

    const requests =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    let pending = 0;

    requests.forEach(
        (request, index) => {

            if (
                request.status ===
                    "Chờ duyệt" ||
                !request.status
            ) {
                pending++;
            }

            const row =
                table.insertRow();

            row.setAttribute(
                "data-status",
                request.status ||
                "Chờ duyệt"
            );

            row.insertCell(0).innerText =
                request.employee ||
                "Nguyễn Văn A";

            row.insertCell(1).innerText =
                request.startDate;

            row.insertCell(2).innerText =
                request.endDate;

            row.insertCell(3).innerText =
                request.reason;

            row.insertCell(4).innerHTML =
                `<span class="status-text">
                ${
                    request.status ||
                    "Chờ duyệt"
                }
                </span>`;

            row.insertCell(5).innerHTML =
                `<input
                    type="text"
                    class="note-input"
                    id="note-${index}"
                    value="${
                        request.note || ""
                    }"
                    placeholder="Ghi chú">`;

            row.insertCell(6).innerHTML =
                `
                <button
                    class="approve-btn"
                    onclick="approveRequest(${index})">
                    Duyệt
                </button>

                <button
                    class="reject-btn"
                    onclick="rejectRequest(${index})">
                    Từ chối
                </button>
                `;
        }
    );

    document.getElementById(
        "pendingCount"
    ).innerText = pending;
}

function approveRequest(index) {

    let requests =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    const note =
        document.getElementById(
            `note-${index}`
        ).value;

    requests[index].status =
        "Đã duyệt";

    requests[index].note =
        note;

    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(requests)
    );

    loadLeaveRequests();

    alert(
        "Đơn nghỉ phép đã được duyệt."
    );
}

function rejectRequest(index) {

    let requests =
        JSON.parse(
            localStorage.getItem(
                "leaveRequests"
            )
        ) || [];

    const note =
        document.getElementById(
            `note-${index}`
        ).value;

    requests[index].status =
        "Đã từ chối";

    requests[index].note =
        note;

    localStorage.setItem(
        "leaveRequests",
        JSON.stringify(requests)
    );

    loadLeaveRequests();

    alert(
        "Đơn nghỉ phép đã bị từ chối."
    );
}

function filterRequests() {

    const filter =
        document.getElementById(
            "filterStatus"
        ).value;

    const rows =
        document.querySelectorAll(
            "#requestTable tr"
        );

    rows.forEach(row => {

        const status =
            row.getAttribute(
                "data-status"
            );

        if (
            filter === "all"
        ) {

            row.style.display =
                "";

        } else {

            row.style.display =
                status === filter
                ? ""
                : "none";
        }
    });
}

function loadEmployeeStatus() {

    const employeeTable =
        document.querySelector(
            "#employees tbody"
        );

    if (!employeeTable) return;

    employeeTable.innerHTML = `
        <tr>
            <td>Nguyễn Văn A</td>
            <td class="working">
                Đang làm việc
            </td>
        </tr>

        <tr>
            <td>Nguyễn Văn B</td>
            <td class="leave">
                Nghỉ phép
            </td>
        </tr>

        <tr>
            <td>Nguyễn Văn C</td>
            <td class="working">
                Đang làm việc
            </td>
        </tr>

        <tr>
            <td>Trần Văn D</td>
            <td class="working">
                Đang làm việc
            </td>
        </tr>
    `;
}

loadEmployeeStatus();
loadLeaveRequests();