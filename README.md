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

### Sign In and View Dashboard

As an admin, I want to:

- sign in with my email and password
- go to my admin page.

### Profession

As an admin, I want to:

- view all professions
- permanently delete any (as long as they are unrelated to any job listing)
- be
