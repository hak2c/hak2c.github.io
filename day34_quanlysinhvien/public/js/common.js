export function renderUserContent(index, user) {
  return `
    <tr>
        <td class="text-center">${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.birthYear}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
        <a class="text-info"
            ><i class="fa fa-edit" aria-hidden="true"></i> Sửa</a
        >
        |
        <a class="text-danger" onclick="deleteUser(user.id)"><i class="fa fa-trash" aria-hidden="true"></i> Xóa</a
        >
        </td>
  </tr>
    `;
}

export function textInputValidation(fieldInput, flag) {
  let inputContent = $.trim($(fieldInput).val());
  if (inputContent != "") {
    $(fieldInput).addClass("is-valid");
    $(fieldInput).removeClass("is-invalid");
  } else {
    $(fieldInput).removeClass("is-valid");
    $(fieldInput).addClass("is-invalid");
    flag = false;
  }
  return flag;
}
