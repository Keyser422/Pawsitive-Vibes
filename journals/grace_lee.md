#### Grace's Development Journal

## 4.12.2024

Set Up Day

-   Our group successfully worked on our wireframe diagrams and discussed API endpoints.
-   Our group successfully set up our GitLab repositories and downloaded our project base.

## 4.15.2024

Today I worked on:

Understanding the various components of our project. I'm trying to understand how to implement a SQL database and table relations. I created the directory data, and inside created a Dockerfile.dev with commands to load the sql file to the Docker database when Docker runs. The dogs.sql file was also created to hold the SQL code that sets up the data types and table structures for our PostgreSQL database. I set up the basic table structure for the various endpoints we will be working with, but the Appointments table will largely be a work-in-progress depending on how we decide to structure the third party API data.

## 4.16.2024

Today I worked on:

Our group is creating issues and assigning them, with the goal of creating 1 table with migrations this week and completing 1 set of endpoints for our models. I created a few issues that we can reference as we create merge requests. I took the sample data tables created in dogs.sql and transferred them to knew .py files in the directory api/migrations.

Then I worked on creating a pets.py in the directory models, with a pet_queries.py file in the directory queries. The pet_queries.py file contains the various CRUD class functions to create, update, delete, and get a pet(s). I also created the pets_routers.py that so far has one get function defined. I have yet to test these functions yet, but I will work more on that tomorrow.
