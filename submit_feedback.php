<?php
header('Content-Type: application/json');

// Настройки подключения к БД
$db_host = 'localhost';
$db_user = 'ваш_пользователь';
$db_pass = 'ваш_пароль';
$db_name = 'natirasnt_feedback';

// Подключение к БД
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Ошибка подключения к БД']));
}

// Получение данных из формы
$name = $conn->real_escape_string($_POST['name']);
$email = $conn->real_escape_string($_POST['email']);
$phone = $conn->real_escape_string($_POST['phone']);
$message = $conn->real_escape_string($_POST['message']);

// Валидация
if (empty($name) {
    echo json_encode(['success' => false, 'message' => 'Имя обязательно']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Некорректный email']);
    exit;
}

// Вставка в БД
$sql = "INSERT INTO feedback (name, email, phone, message) VALUES ('$name', '$email', '$phone', '$message')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true, 'message' => 'Сообщение сохранено']);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка сохранения: ' . $conn->error]);
}

$conn->close();
?>