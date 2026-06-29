const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


async function loadLeaveRequests() {

    try {

        const response = await fetch(
            "http://localhost:3000/api/manager/leaves",
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        const leaves = await response.json();

        const table = document.getElementById("leaveTable");

        table.innerHTML = "";

        leaves.forEach((leave) => {

            const row = table.insertRow();

            row.insertCell(0).innerText = leave.fullname;
            row.insertCell(1).innerText = leave.start_date;
            row.insertCell(2).innerText = leave.end_date;
            row.insertCell(3).innerText = leave.reason;

            row.insertCell(4).innerHTML =
                `<strong>${leave.status}</strong><br>
                 <small>${leave.note || ""}</small>`;

            row.insertCell(5).innerHTML = `
                <input
                    class="note-input"
                    id="note-${leave.id}"
                    placeholder="Ghi chú">
            `;

            row.insertCell(6).innerHTML = `
                <button
                    class="approve-btn"
                    onclick="approveLeave(${leave.id})">
                    Duyệt
                </button>

                <button
                    class="reject-btn"
                    onclick="rejectLeave(${leave.id})">
                    Từ chối
                </button>
            `;

        });

    } catch (err) {

        console.error(err);

        alert("Không tải được dữ liệu.");

    }

}

async function approveLeave(id) {

    const note =
        document.getElementById(`note-${id}`).value;

    try {

        await fetch(

            `http://localhost:3000/api/manager/leaves/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    status: "Approved",

                    note: note

                })

            }

        );

        alert("Đã duyệt đơn.");

        loadLeaveRequests();

    } catch (err) {

        console.error(err);

    }

}

async function rejectLeave(id) {

    const note =
        document.getElementById(`note-${id}`).value;

    try {

        await fetch(

            `http://localhost:3000/api/manager/leaves/${id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": "Bearer " + token

                },

                body: JSON.stringify({

                    status: "Rejected",

                    note: note

                })

            }

        );

        alert("Đã từ chối đơn.");

        loadLeaveRequests();

    } catch (err) {

        console.error(err);

    }

}

function filterStatus() {

    const filter =
        document.getElementById("filterStatus").value;

    const rows =
        document.querySelectorAll("#leaveTable tr");

    rows.forEach((row) => {

        const status =
            row.cells[4].innerText;

        if (filter === "all") {

            row.style.display = "";

        }

        else if (status.includes(filter)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

}

function logout() {

    if (confirm("Bạn có muốn đăng xuất?")) {

        localStorage.removeItem("token");

        window.location.href = "login.html";

    }

}

function scrollToSection(id) {

    document
        .getElementById(id)
        .scrollIntoView({

            behavior: "smooth"

        });

}

async function loadChart() {

    try {

        const response = await fetch(

            "http://localhost:3000/api/manager/leaves",

            {

                headers: {

                    Authorization: "Bearer " + token

                }

            }

        );

        const data =
            await response.json();

        const approved =
            data.filter(x => x.status === "Approved").length;

        const rejected =
            data.filter(x => x.status === "Rejected").length;

        const pending =
            data.filter(x => x.status === "Pending").length;

        document.getElementById("approvedCount").innerText = approved;
        document.getElementById("rejectedCount").innerText = rejected;
        document.getElementById("pendingCount").innerText = pending;

    } catch (err) {

        console.log(err);

    }

}

loadLeaveRequests();

loadChart();