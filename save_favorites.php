<?php

$data = file_get_contents('php://input');
$request = json_decode($data, true);

$favorites = $request['favorites'];

file_put_contents('favorites.txt', implode("\n", $favorites));

echo "Favorites saved successfully!";
?>
