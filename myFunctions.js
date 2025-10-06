function validateForm() {
  let appName = document.forms[0]["appName"].value.trim();
  let company = document.forms[0]["company"].value.trim();
  let website = document.forms[0]["website"].value.trim();
  let regexName = /^[A-Za-z ]+$/;
  let regexUrl = /^(http|https):\/\/[^ "]+$/;

  if (!regexName.test(appName)) {
    alert(" اسم التطبيق يجب أن يكون أحرف إنكليزية فقط وبدون فراغات.");
    return false;
  }

  if (!regexName.test(company)) {
    alert(" اسم الشركة يجب أن يكون أحرف إنكليزية فقط.");
    return false;
  }

  if (!regexUrl.test(website)) {
    alert(" الرجاء إدخال رابط موقع صحيح (http أو https).");
    return false;
  }

  return true;
}
$(document).ready(function () {
  $("#appForm").on("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const appData = {
      name: $("input[name='appName']").val().trim(),
      company: $("input[name='company']").val().trim(),
      website: $("input[name='website']").val().trim(),
      free: $("select[name='free']").val() === "free" ? "مجاني" : "غير مجاني",
      domain: $("select[name='domain']").val(),
      description: $("textarea[name='description']").val().trim(),
    };

    let apps = JSON.parse(localStorage.getItem("apps")) || [];
    apps.push(appData);
    localStorage.setItem("apps", JSON.stringify(apps));

    alert(" تم حفظ التطبيق بنجاح!");
    window.location.href = "apps.html";
  });
});

$(document).ready(function () {
  const table = $("#appsTable");

  const apps = JSON.parse(localStorage.getItem("apps")) || [];
  if (apps.length > 0) {
    apps.forEach((app, index) => {
      const newRow = `
        <tr>
          <td>${app.name}</td>
          <td>${app.company}</td>
          <td>${app.domain}</td>
          <td><input type="checkbox" ${
            app.free === "مجاني" ? "checked" : ""
          } disabled></td>
          <td><input type="radio" name="appSelect" value="app${index + 1}"></td>
        </tr>
        <tr class="details-row" id="app${index + 1}" style="display:none;">
          <td colspan="5">
            <a href="${app.website}" target="_blank">${app.website}</a>
            <p>${app.description || "لا يوجد وصف."}</p>
          </td>
        </tr>
      `;
      table.append(newRow);
    });
  }
});
function loadApps() {
  const tbody = document.querySelector("#appsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const apps = JSON.parse(localStorage.getItem("apps")) || [];

  apps.forEach((app, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${app.name}</td>
      <td>${app.company}</td>
      <td><a href="${app.website}" target="_blank">${app.website}</a></td>
      <td>${app.free}</td>
      <td>${app.domain}</td>
      <td>${app.description}</td>
      <td><button class="delete-btn" onclick="deleteApp(${index})">🗑️ حذف</button></td>
    `;

    tbody.appendChild(row);
  });
}

function showDetailsRow() {
  const selected = document.querySelector('input[name="appSelect"]:checked');
  if (!selected) {
    alert("يرجى اختيار تطبيق أولاً ");
    return;
  }

  const detailsRow = document.getElementById(selected.value);

  document.querySelectorAll(".details-row").forEach((row) => {
    if (row !== detailsRow) row.style.display = "none";
  });

  if (detailsRow.style.display === "none" || detailsRow.style.display === "") {
    detailsRow.style.display = "table-row";
  } else {
    detailsRow.style.display = "none";
  }
}
