<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'user_type',
        'is_archived',
        'birthday',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_archived' => 'boolean',
    ];

    /**
     * Relationships
     */

    // A user may be associated with a student profile
    public function student()
    {
        return $this->hasOne(Student::class);
    }

    // A user may be associated with an instructor profile
    public function instructor()
    {
        return $this->hasOne(Instructor::class);
    }

    // A user may be associated with an admin profile
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    /**
     * Scopes
     */

    // Scope for active users
    public function scopeActive($query)
    {
        return $query->where('is_archived', false);
    }

    // Scope for filtering by user type
    public function scopeOfType($query, $type)
    {
        return $query->where('user_type', $type);
    }

    /**
     * Helpers
     */

    // Check if the user is an admin
    public function isAdmin()
    {
        return $this->user_type === 'admin';
    }

    // Check if the user is an instructor
    public function isInstructor()
    {
        return $this->user_type === 'instructor';
    }

    // Check if the user is a student
    public function isStudent()
    {
        return $this->user_type === 'student';
    }
}
