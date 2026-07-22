<?php
header('Content-Type: text/plain');
echo "Root Directories:\n";
foreach (glob("*", GLOB_ONLYDIR) as $dir) {
    echo "Dir: $dir\n";
}
echo "\nChecking 'blog' directory:\n";
if (is_dir("blog")) {
    echo "blog/ is a directory.\n";
    echo "Files inside blog/:\n";
    foreach (glob("blog/*") as $file) {
        echo "  $file\n";
    }
} else {
    echo "blog/ is NOT a directory.\n";
}
echo "\nChecking 'blog-wp' directory:\n";
if (is_dir("blog-wp")) {
    echo "blog-wp/ is a directory.\n";
} else {
    echo "blog-wp/ is NOT a directory.\n";
}
?>
