<?php

if (!class_exists('PHPCompiler')) {
    class PHPCompiler
    {
        private $sourceDir;
        private $outputDir;
        private $ignorePaths;

        public function __construct($sourceDir, $outputDir, $ignorePaths = [])
        {
            $this->sourceDir = $sourceDir;
            $this->outputDir = $outputDir;
            $this->ignorePaths = $ignorePaths;
        }

        public function compile()
        {
            $this->recursiveCompile($this->sourceDir);
        }

        private function recursiveCompile($dir)
        {
            $files = scandir($dir);

            foreach ($files as $file) {
                if ($file === '.' || $file === '..' || substr($file, 0, 1) === '.' || $file === 'compiler.php') {
                    continue;
                }

                $filePath = $dir . DIRECTORY_SEPARATOR . $file;
                $relativePath = str_replace($this->sourceDir, '', $filePath);
                $outputPath = $this->outputDir . $relativePath;

                // Skip ignored paths
                foreach ($this->ignorePaths as $ignorePath) {
                    if (strpos($relativePath, $ignorePath) === 0) {
                        continue 2;
                    }
                }

                if (is_dir($filePath)) {
                    if (!is_dir($outputPath)) {
                        mkdir($outputPath, 0777, true);
                    }
                    $this->recursiveCompile($filePath);
                } elseif (pathinfo($filePath, PATHINFO_EXTENSION) === 'php') {
                    $this->compileFile($filePath, $outputPath);
                } else {
                    $this->copyFile($filePath, $outputPath);
                }
            }
        }

        private function compileFile($filePath, $outputPath)
        {
            ob_start();
            include $filePath;
            $content = ob_get_clean();

            // Replace .php links with .html
            $content = str_replace('.php', '.html', $content);

            $outputPath = preg_replace('/\.php$/', '.html', $outputPath);
            $this->createDirectoryIfNotExists(dirname($outputPath));
            file_put_contents($outputPath, $content);
        }

        private function copyFile($filePath, $outputPath)
        {
            $this->createDirectoryIfNotExists(dirname($outputPath));
            copy($filePath, $outputPath);
        }

        private function createDirectoryIfNotExists($dir)
        {
            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
        }
    }

    // Usage
    $sourceDir = __DIR__ . '/'; // Change this to your source directory
    $outputDir = __DIR__ . '/public'; // Change this to your output directory
    $ignorePaths = ['/.github', '/public']; // Add directories to ignore

    $compiler = new PHPCompiler($sourceDir, $outputDir, $ignorePaths);
    $compiler->compile();

    echo "Compilation complete.\n";
}
