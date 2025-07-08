<?php
header('Content-Type: application/json');

// Simple PHP backend to handle video download requests
// In a production environment, this would be more complex and secure

$input = json_decode(file_get_contents('php://input'), true);
$url = isset($input['url']) ? trim($input['url']) : '';

if (empty($url)) {
    echo json_encode(['success' => false, 'error' => 'URL is required']);
    exit;
}

// Validate URL
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid URL']);
    exit;
}

// Simulate processing delay
sleep(2);

// Simulate response for different platforms
if (strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false) {
    $response = [
        'success' => true,
        'platform' => 'youtube',
        'title' => 'Sample YouTube Video',
        'thumbnail' => 'https://via.placeholder.com/400x225',
        'duration' => '3:45',
        'views' => '1.5M',
        'formats' => [
            ['quality' => '1080p', 'format' => 'MP4', 'size' => '45MB'],
            ['quality' => '720p', 'format' => 'MP4', 'size' => '28MB'],
            ['quality' => '480p', 'format' => 'MP4', 'size' => '15MB'],
            ['quality' => '360p', 'format' => 'MP4', 'size' => '8MB'],
            ['quality' => 'Audio', 'format' => 'MP3', 'size' => '3.5MB']
        ]
    ];
} elseif (strpos($url, 'instagram.com') !== false) {
    $response = [
        'success' => true,
        'platform' => 'instagram',
        'title' => 'Sample Instagram Video',
        'thumbnail' => 'https://via.placeholder.com/400x225',
        'duration' => '0:45',
        'views' => '245K',
        'formats' => [
            ['quality' => 'HD', 'format' => 'MP4', 'size' => '12MB'],
            ['quality' => 'SD', 'format' => 'MP4', 'size' => '6MB'],
            ['quality' => 'Audio', 'format' => 'MP3', 'size' => '1.2MB']
        ]
    ];
} else {
    $response = [
        'success' => true,
        'platform' => 'generic',
        'title' => 'Sample Video',
        'thumbnail' => 'https://via.placeholder.com/400x225',
        'duration' => '2:15',
        'views' => 'N/A',
        'formats' => [
            ['quality' => 'Original', 'format' => 'MP4', 'size' => '18MB'],
            ['quality' => 'Audio', 'format' => 'MP3', 'size' => '2.8MB']
        ]
    ];
}

echo json_encode($response);
?>
