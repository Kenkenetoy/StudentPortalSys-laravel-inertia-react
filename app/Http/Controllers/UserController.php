<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Fetch Users by Status
    public function getUsersByStatus($status)
    {
        $users = User::where('status', $status)->get();
        return response()->json($users);
    }

    public function pendingUsers()
    {
        return $this->getUsersByStatus('pending');
    }

    public function approvedUsers()
    {
        return $this->getUsersByStatus('approved');
    }

    public function rejectedUsers()
    {
        return $this->getUsersByStatus('rejected');
    }

    public function bannedUsers()
    {
        return $this->getUsersByStatus('banned');
    }

    // Update User Status
    public function updateUserStatus($id, $status, $successMessage)
    {
        try {
            $user = User::findOrFail($id);
            $user->status = $status;
            $user->save();

            return response()->json(['message' => $successMessage], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user status', 'error' => $e->getMessage()], 500);
        }
    }

    public function approve($id)
    {
        return $this->updateUserStatus($id, 'approved', 'User approved successfully');
    }

    public function reject($id)
    {
        return $this->updateUserStatus($id, 'rejected', 'User rejected successfully');
    }

    public function ban($id)
    {
        return $this->updateUserStatus($id, 'banned', 'User banned successfully');
    }

    // Profile Management
    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            $user = auth()->user();
            $image = $request->file('profile_picture');
            $imageName = $image->getClientOriginalName();
            $imagePath = $image->storeAs('images/profilepicture', $imageName, 'public');

            // Delete the old profile picture if it exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete('images/profilepicture/' . $user->profile_picture);
            }

            $user->profile_picture = $imageName;
            $user->save();

            return response()->json(['profile_picture' => $imageName]);
        }

        return response()->json(['error' => 'No image uploaded'], 400);
    }

    public function getProfilePicture(Request $request)
    {
        $user = $request->user();
        $profilePictureUrl = $user->profile_picture
            ? asset('storage/images/profilepicture/' . $user->profile_picture)
            : null;
        return response()->json(['profile_picture_url' => $profilePictureUrl]);
    }

    public function getName(Request $request)
    {
        $user = $request->user();
        return response()->json(['name' => $user->name]);
    }

    public function getEmail(Request $request)
    {
        $user = $request->user();
        return response()->json(['email' => $user->email]);
    }

        public function getBirthday(Request $request)
    {
        $user = $request->user();
        return response()->json(['birthday' => $user->birthday]);
    }
}
