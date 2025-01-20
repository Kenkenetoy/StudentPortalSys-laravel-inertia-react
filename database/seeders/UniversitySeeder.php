<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UniversitySeeder extends Seeder
{
    public function run()
    {
        // Seed in the correct order to avoid foreign key constraint errors.

        $this->call([
            DepartmentsTableSeeder::class,
            ProgramsTableSeeder::class,
            UsersTableSeeder::class,
            StudentsTableSeeder::class,
            InstructorsTableSeeder::class,
            AdminsTableSeeder::class,
            AcademicYearsTableSeeder::class,
            ClassroomsTableSeeder::class,
            ClassroomAvailabilityTableSeeder::class,
            CourseInstructorsTableSeeder::class,
            CoursesTableSeeder::class,
            EnrollmentsTableSeeder::class,
            GradesTableSeeder::class,
            CoursePrerequisitesTableSeeder::class,

        ]);
    }
}

// Departments Table Seeder
class DepartmentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $index) {
            DB::table('departments')->insert([
                'name' => $faker->company . ' Department',
                'description' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Programs Table Seeder
class ProgramsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $departmentIds = DB::table('departments')->pluck('id');

        foreach (range(1, 10) as $index) {
            DB::table('programs')->insert([
                'name' => $faker->jobTitle . ' Program',
                'description' => $faker->paragraph,
                'department_id' => $faker->randomElement($departmentIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Users Table Seeder
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 100) as $index) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
                'status' => $faker->randomElement(['active', 'inactive']),
                'user_type' => $faker->randomElement(['student', 'instructor', 'admin']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        }
    }
}

// Students Table Seeder
class StudentsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = DB::table('users')->where('user_type', 'student')->pluck('id');
        $programIds = DB::table('programs')->pluck('id');
        $departmentIds = DB::table('departments')->pluck('id');

        foreach ($userIds as $userId) {
            DB::table('students')->insert([
                'user_id' => $userId,
                'program_id' => $faker->randomElement($programIds),
                'department_id' => $faker->randomElement($departmentIds),
                'enrolled_at' => $faker->dateTimeThisDecade,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Instructors Table Seeder
class InstructorsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = DB::table('users')->where('user_type', 'instructor')->pluck('id');
        $programIds = DB::table('programs')->pluck('id');
        $departmentIds = DB::table('departments')->pluck('id');

        foreach ($userIds as $userId) {
            DB::table('instructors')->insert([
                'user_id' => $userId,
                'program_id' => $faker->randomElement($programIds),
                'department_id' => $faker->randomElement($departmentIds),
                'hired_at' => $faker->dateTimeThisDecade,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Admins Table Seeder
class AdminsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $userIds = DB::table('users')->where('user_type', 'admin')->pluck('id');
        $programIds = DB::table('programs')->pluck('id');

        foreach ($userIds as $userId) {
            DB::table('admins')->insert([
                'user_id' => $userId,
                'role' => $faker->jobTitle,
                'program_id' => $faker->randomElement($programIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Academic Years Table Seeder
class AcademicYearsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(2020, 2025) as $year) {
            DB::table('academic_years')->insert([
                'start_year' => $year,
                'end_year' => $year + 1,
                'description' => $faker->sentence,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Classrooms Table Seeder
class ClassroomsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('classrooms')->insert([
                'name' => 'Room ' . $index,
                'building' => $faker->city,
                'capacity' => $faker->numberBetween(20, 100),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

// Courses Table Seeder
class CoursesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $classroom_availabilityIds = DB::table('classroom_availability')->pluck('id')->toArray();
        $programIds = DB::table('programs')->pluck('id')->toArray();

        foreach (range(1, 30) as $index) {
            DB::table('courses')->insert([
                'name' => $faker->word . ' 101',
                'description' => $faker->paragraph,
                'program_id' => $faker->randomElement($programIds),
                'classroom_availability_id' => $faker->randomElement($classroom_availabilityIds),
                'academic_year_id' => DB::table('academic_years')->inRandomOrder()->value('id'), // Example for additional fields
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

class CoursePrerequisitesTableSeeder extends Seeder
{
    public function run()
    {
        $courses = DB::table('courses')->pluck('id')->toArray();

        foreach ($courses as $courseId) {
            $prerequisiteId = $courses[array_rand($courses)];
            if ($courseId !== $prerequisiteId) {
                DB::table('course_prerequisites')->insert([
                    'course_id' => $courseId,
                    'prerequisite_course_id' => $prerequisiteId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

class ClassroomAvailabilityTableSeeder extends Seeder
{
    public function run()
    {
        $classrooms = DB::table('classrooms')->pluck('id')->toArray();
        $academicYears = DB::table('academic_years')->pluck('id')->toArray();
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        foreach ($classrooms as $classroomId) {
            foreach ($academicYears as $academicYearId) {
                DB::table('classroom_availability')->insert([
                    'classroom_id' => $classroomId,
                    'academic_year_id' => $academicYearId,
                    'day_of_week' => $daysOfWeek[array_rand($daysOfWeek)],
                    'start_time' => '08:00:00',
                    'end_time' => '10:00:00',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

class CourseInstructorsTableSeeder extends Seeder
{
    public function run()
    {
        $courses = DB::table('courses')->pluck('id')->toArray();
        $instructors = DB::table('instructors')->pluck('id')->toArray();

        foreach ($courses as $courseId) {
            $instructorId = $instructors[array_rand($instructors)];
            DB::table('course_instructors')->insert([
                'course_id' => $courseId,
                'instructor_id' => $instructorId,
                'is_archived' => false,
            ]);
        }
    }
}

class EnrollmentsTableSeeder extends Seeder
{
    public function run()
    {
        $students = DB::table('students')->pluck('id')->toArray();
        $courses = DB::table('courses')->pluck('id')->toArray();
        $academicYears = DB::table('academic_years')->pluck('id')->toArray();

        foreach ($students as $studentId) {
            $courseId = $courses[array_rand($courses)];
            $academicYearId = $academicYears[array_rand($academicYears)];
            DB::table('enrollments')->insert([
                'student_id' => $studentId,
                'course_id' => $courseId,
                'academic_year_id' => $academicYearId,
                'enrolled_at' => now(),
                'created_at' => now(),
            ]);
        }
    }
}

class GradesTableSeeder extends Seeder
{
    public function run()
    {
        $enrollments = DB::table('enrollments')->get();

        foreach ($enrollments as $enrollment) {
            $grades = ['A', 'B', 'C', 'D', 'F'];
            DB::table('grades')->insert([
                'student_id' => $enrollment->student_id,
                'course_id' => $enrollment->course_id,
                'grade' => $grades[array_rand($grades)],
                'created_at' => now(),
            ]);
        }
    }
}




// Add additional seeders for prerequisites, enrollments, grades, etc.

// Don't forget to run: php artisan db:seed
