<?php
header('Content-Type: application/json');

// Simple PHP backend to handle download requests
// In a production environment, this would actually process and serve the video file

$input = json_decode(file_get_contents('php://input'), true);
$url = isset($input['url']) ? trim($input['url']) : '';
$quality = isset($input['quality']) ? trim($input['quality']) : '';

if (empty($url) || empty($quality)) {
    echo json_encode(['success' => false, 'error' => 'URL and quality are required']);
    exit;
}

// Validate URL
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid URL']);
    exit;
}

// Simulate processing delay
sleep(3);

// Simulate response
$response = [
    'success' => true,
    'downloadUrl' => 'https://example.com/downloads/sample_video.mp4',
    'filename' => 'downloaded_video.mp4',
    'size' => '45MB'
];

echo json_encode($response);
?>
