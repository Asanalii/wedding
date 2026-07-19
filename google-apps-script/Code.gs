// ============================================================
//  Той — приём ответов гостей и запись в таблицу
//  Ничего в этом коде менять НЕ нужно. Просто вставь целиком.
// ============================================================

// Эта функция срабатывает, когда сайт присылает ответ гостя.
function doPost(e) {
  try {
    // Берём активную таблицу (ту, к которой привязан скрипт)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Если таблица пустая — добавляем строку-заголовок один раз
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Дата ответа", "Имя гостя", "Имя партнёра", "Придёт ли", "Язык"
      ]);
    }

    // Разбираем данные, пришедшие с сайта
    var data = JSON.parse(e.postData.contents);

    // Добавляем новую строку с ответом
    sheet.appendRow([
      new Date(),                 // когда ответил
      data.name || "",            // имя гостя
      data.partner || "",         // имя партнёра
      data.attendance || "",      // придёт / придёт с парой / не придёт
      data.lang || ""             // на каком языке заполнял
    ]);

    // Отвечаем сайту "всё ок"
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Если что-то пошло не так — вернём ошибку
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Нужна, чтобы можно было проверить, что скрипт вообще работает,
// открыв его адрес в браузере.
function doGet(e) {
  return ContentService
    .createTextOutput("Скрипт работает. Готов принимать ответы гостей.")
    .setMimeType(ContentService.MimeType.TEXT);
}
