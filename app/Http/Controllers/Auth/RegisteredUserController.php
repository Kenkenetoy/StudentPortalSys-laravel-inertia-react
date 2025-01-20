<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'string',
            'lowercase',
            'email',
            'max:255',
            'unique:' . User::class,
            'regex:/^[a-zA-Z0-9._%+-]+@cec\.edu\.ph$/',
        ],
        'birthday' => 'required|date|before:' . now()->subYears(16)->toDateString(),
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ], [
    'birthday.before' => 'You must be at least 16 years old to register.',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'status' => 'pending',
        'user_type' => 'student',
        'birthday' => $request->birthday,
        'profile_picture' => 'placeholder-profile.jpg',
    ]);

    event(new Registered($user));

    Auth::login($user);

    return redirect(route('dashboard', absolute: false));
}
}
