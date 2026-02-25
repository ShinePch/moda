<?php
$url = $_GET['url'];

if (empty($url)) {
    http_response_code(400);
    echo json_encode(['error' => 'url parameter required']);
    exit;
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Accept-Language: en-US,en;q=0.9'
]);

$data     = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error    = curl_error($ch);
curl_close($ch);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($data === false || !empty($error)) {
    http_response_code(500);
    echo json_encode(['error' => $error]);
    exit;
}

http_response_code($httpCode);
echo $data;
?>