# System Description

The recruitment company website is a platform designed to help job seekers find and apply for open positions. The website allows users to browse job listings and submit their resumes for consideration.

In addition to the job search and application functionality, there is also a back-office management application for managing job listings, users, and their applications. This application provides an administrative interface for reviewing resumes, managing job postings, and tracking applicant status.

# Technical Details

The website is built using a Next.js mono repo architecture with Prisma and MongoDB as the primary database systems. Authentication is handled using OAuth providers, allowing users to sign in with their existing social media accounts. The platform also includes user management functionality, allowing administrators to manage user accounts and permissions within the system.

# Key Features

- Job search and application functionality for job seekers
- Administrative back-office application for managing job listings and user applications
- Authentication using OAuth providers
- User management functionality for system administrators
- Built with a Next.js mono repo architecture using Prisma and MongoDB


# Product Requirements Document (PRD)

## System Stories

### Job Listings

As a system, I want each job listing to have the following details:

- name `<Text>`
- profession `<Profession>` (e.g., sales, logistics, cooking)
- area `<Area>` (e.g., Tel Aviv, Southern District)
- employer `<Employer>`
- pay range `<Text>`
- is active `<Boolean>`
- id `<Text>` @unique @id
- description `<Text>`

As a system, I want to automatically deactivate job applications on expiration date.

As a system, I want to prevent inactive job listings from showing up in job seekers' search.

As a system, I want to prevent the admin from adding job listings with an area, job type, or employer that does not exist.

### Profession

As a system, I want to prevent the admin from deleting professions that are related to job listings.

As a system, I want each profession to have the following details:

- name `<Text>`
- id `<Text>` @unique @id

### Area

As a system, I want to prevent the admin from deleting areas that are related to job listings.

As a system, I want each area to have the following details:

- name `<Text>`
- id `<Text>` @unique @id

### Employers

As a system, I want each employer to have the following details:

- id `<Text>` @unique @id
- name `<Text>`
- is vip `<Boolean>`
- het-pey `<Text>` @unique
- contact name `<Text>`
- contact phone `<Text>`
- contact email `<Text>`
- points

As a system, I want to prevent the admin from adding employers with duplicate het-pey.

### Job Application

As a system, I want each job application to have the following details:

- id `<Text>` @id @unique
- appliedFor `<JobListing>`
- appliedAt `<DateTime>`
- appliedBy `<JobSeeker>`

As a system, I want to prevent unregistered job seekers from applying to a job.

As a system, I want to direct unregistered job seekers to the sign-in page.

As a system, I want to prevent job seekers without a CV from applying to a job.

### Job Seekers

As a system, I want each job seeker to have the following details:

- name `<Text>` (taken from Google) (uneditable)
- email `<Text>` @unique (taken from Google) (uneditable)
- phone `<Text>`
- cv `<PDF>`
- id `<Text>` @unique @id

As a system, I want to prevent job seekers without a CV and phone from applying.

As a system, I want to redirect a job seeker that clicked ‘apply for a job’ but have no phone and cv to the relevant page.

## Admin Story

## Story 1

**Title:** Updating user information

**User Story:** As an administrator, I want to be able to update user information, such as name, email, and password, so that I can keep user data up to date and accurate.

**Acceptance Criteria:**
- I can access the user profile page from the admin dashboard.
- I can edit the user's name, email, and password.
- When I save the changes, the user's information is updated in the database.

## Story 2

**Title:** Creating a new user account

**User Story:** As an administrator, I want to be able to create a new user account, so that new users can start using our system.

**Acceptance Criteria:**
- I can access the "Create User" page from the admin dashboard.
- I can enter the new user's name, email, and password.
- When I save the new user account, the user's information is saved to the database.
- The new user receives an email with their account information and instructions for logging in.

## Story 3

**Title:** Deleting a user account

**User Story:** As an administrator, I want to be able to delete a user account, so that we can remove inactive or unwanted users from our system.

**Acceptance Criteria:**
- I can access the user profile page from the admin dashboard.
- I can click on the "Delete User" button.
- When I confirm the deletion, the user's account is deleted from the database.
- Any data associated with the user is also deleted.



- view all professions
- permanently delete any (as long as they are unrelated to any job listing)
- be
