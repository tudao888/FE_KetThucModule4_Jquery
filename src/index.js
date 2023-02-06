function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/staffs",
        //xử lý khi thành công
        success: function (staffs) {
            console.log(staffs)
            let str = '';
            for (const staff of staffs) {
                str += `<tr>
                        <th>${staff.id}</th>
                        <th>${staff.name}</th>
                        <th>${staff.age}</th>
                        <th>${staff.department.name}</th>
                        <th><button type="button" class="btn btn-primary" onclick="showEdit(${staff.id})" data-bs-toggle="modal" data-bs-target="#myModalEdit" >Sửa</button></th>
                        <th><button type="button" class="btn btn-primary" onclick="deleteStaff(${staff.id})" >Xóa</button></th>
                        </tr>`
            }

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
}

show();

function Create() {
    let staff = {
        "name": document.getElementById("name").value,
        "age": $("#age").val(),
        "department": {
            "id": $("#idDepartment").val()
        }
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/staffs",
        data: JSON.stringify(staff),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function deleteStaff(id) {
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/staffs/" + id,
        //xử lý khi thành công
        success: function () {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
        },
        url: "http://localhost:8080/staffs/" + id,
        //xử lý khi thành công
        success: function (staff) {
            document.getElementById("idEdit").value = staff.id;
            document.getElementById("nameEdit").value = staff.name;
            document.getElementById("ageEdit").value = staff.age;
            document.getElementById("idDepartmentEdit").value = staff.department.id;
            // $("#idDepartmentEdit").val(staff.departmentEdit.id);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function updateStaff() {
    let staff = {
        "id": document.getElementById("idEdit").value,
        "name": document.getElementById("nameEdit").value,
        "age": $("#ageEdit").val(),
        "department": {
            "id": $("#idDepartmentEdit").val()
        }
    }

    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/staffs",
        data: JSON.stringify(staff),
        //xử lý khi thành công
        success: function (data) {
            alert("Thành công");
            show();
        },
        error: function (err) {
            console.log(err)
        }
    })
}