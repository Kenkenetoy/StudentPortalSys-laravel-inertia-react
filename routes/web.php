<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'name' => auth()->user() ? auth()->user()->name : null,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/edit', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/edit', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    // List of user statuses
    $statuses = ['pending', 'approved', 'rejected', 'banned'];

    // Loop through each status and create the route
    foreach ($statuses as $status) {
        Route::get("/admin/users/{$status}", [UserController::class, "{$status}Users"]);
    }
});

Route::prefix('admin/users')->group(function () {
    // List of actions
    $actions = ['approve', 'reject', 'ban'];

    // Loop through each action and create the route
    foreach ($actions as $action) {
        Route::patch("{id}/{$action}", [UserController::class, $action])
            ->name("admin.users.{$action}");
    }
});

Route::post('/user/profile-picture', [UserController::class, 'updateProfilePicture'])->middleware('auth');

$routes = [
    'profile-picture' => 'getProfilePicture',
    'name' => 'getName',
    'email' => 'getEmail',
    'birthday' => 'getBirthday',
    'course' => 'getCourse',
];

// Group all user-related routes together with the 'user' prefix
Route::prefix('user')->middleware('auth:sanctum')->group(function () use ($routes) {
    // Loop through the routes array and define each route dynamically
    foreach ($routes as $route => $action) {
        Route::get($route, [UserController::class, $action]);
    }
});


require __DIR__.'/auth.php';
