<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Programs table
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignId('department_id')->constrained();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Users table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('remember_token')->nullable();
            $table->timestamps();
            $table->string('status');
            $table->string('user_type');
            $table->string('birthday')->nullable();
            $table->string('profile_picture')->nullable();
            $table->boolean('is_archived')->default(false);
        });

        // Students table
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('program_id')->constrained();
            $table->foreignId('department_id')->constrained();
            $table->timestamp('enrolled_at');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Instructors table
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('program_id')->constrained();
            $table->foreignId('department_id')->constrained();
            $table->timestamp('hired_at');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Admins table
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('role');
            $table->foreignId('program_id')->nullable()->constrained();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Courses table
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignId('program_id')->constrained();
            $table->foreignId('classroom_availability_id')->constrained();
            $table->foreignId('academic_year_id')->constrained();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Course prerequisites table
        Schema::create('course_prerequisites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained();
            $table->foreignId('prerequisite_course_id')->constrained();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Grades table
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained();
            $table->foreignId('course_id')->constrained();
            $table->string('grade');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Course instructors table
        Schema::create('course_instructors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained();
            $table->foreignId('instructor_id')->constrained();
            $table->boolean('is_archived')->default(false);
            $table->timestamps();
        });

        // Departments table
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Classrooms table
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('building');
            $table->integer('capacity');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Academic years table
        Schema::create('academic_years', function (Blueprint $table) {
            $table->id();
            $table->integer('start_year');
            $table->integer('end_year');
            $table->string('description')->nullable();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Classroom availability table
        Schema::create('classroom_availability', function (Blueprint $table) {
            $table->id();
            $table->foreignId('classroom_id')->constrained();
            $table->foreignId('academic_year_id')->constrained();
            $table->string('day_of_week');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        // Enrollments table
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained();
            $table->foreignId('course_id')->constrained();
            $table->foreignId('academic_year_id')->constrained();
            $table->timestamp('enrolled_at');
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });
    }

    public function down()
    {
        Schema::dropIfExists('enrollments');
        Schema::dropIfExists('classroom_availability');
        Schema::dropIfExists('academic_years');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('course_instructors');
        Schema::dropIfExists('grades');
        Schema::dropIfExists('course_prerequisites');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('admins');
        Schema::dropIfExists('instructors');
        Schema::dropIfExists('students');
        Schema::dropIfExists('users');
        Schema::dropIfExists('programs');
    }
}
;
