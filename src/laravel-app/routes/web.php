<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Illuminate\Foundation\Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/test-db', function () {
    try {
        $pdo = \DB::connection()->getPdo();
        $result = [
            'connected' => true,
            'database' => \DB::connection()->getDatabaseName(),
            'version' => $pdo->getAttribute(\PDO::ATTR_SERVER_VERSION),
            'connection' => $pdo->getAttribute(\PDO::ATTR_CONNECTION_STATUS)
        ];
        
        // Test write permission
        \DB::select('CREATE TABLE IF NOT EXISTS test_table (id INT)');
        \DB::select('DROP TABLE IF EXISTS test_table');
        $result['can_write'] = true;
        
        return response()->json($result);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'type' => get_class($e),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

Route::get('/debug-tables', function () {
    try {
        $tables = \DB::select('SHOW TABLES');
        $migrations = \DB::select('SELECT * FROM migrations');
        $schema = \DB::select('DESCRIBE contact_messages');
        
        return [
            'tables' => $tables,
            'migrations' => $migrations,
            'contact_messages_schema' => $schema
        ];
    } catch (\Exception $e) {
        return [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ];
    }
});