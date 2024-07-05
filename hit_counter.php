<?php
$filename = 'hit_counter.txt';
$resetFile = 'reset_date.txt';
$currentDate = date('Y-m-d');

if (file_exists($resetFile)) {
    $lastResetDate = file_get_contents($resetFile);
    if ($lastResetDate != $currentDate) {
        $hit_count = 1;
        file_put_contents($filename, $hit_count);
        file_put_contents($resetFile, $currentDate);
    } else {
        $hit_count = file_get_contents($filename);
        $hit_count++;
        file_put_contents($filename, $hit_count);
    }
} else {
    $hit_count = 1;
    file_put_contents($filename, $hit_count);
    file_put_contents($resetFile, $currentDate);
}

echo $hit_count;

?>
