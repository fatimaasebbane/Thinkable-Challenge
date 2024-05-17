# Thinkable Blog Application
This is a simple blog application developed using Next.js, MongoDB, and Prisma.

## Functional Requirements

### Create New Blog Post:

Users can create a new blog post by providing a title and content.

Implemented with a form allowing users to input title and content.

Backend API endpoint /posts handles the creation of new posts.

### View List of Blog Posts:

Users can view a list of all blog posts.

Implemented with a page listing all posts retrieved from the backend API.

### View Specific Blog Post:

Users can view the details of a specific blog post.

Implemented with a dynamic route to display individual post details.

### Update Existing Blog Post:

Users can update the title and content of an existing blog post.

Implemented with a form allowing users to edit title and content.

Backend API endpoint /posts/[id] handles the update of existing posts.

### Delete Blog Post:

Users can delete a blog post.

Implemented with a button to delete a post.

Backend API endpoint /posts/[id] handles the deletion of posts.

## Technical Stack
### Frontend:
Developed with Next.js for server-side rendering and routing.

Used MongoDB for database storage.

### Backend:
Leveraged Prisma as the ORM for MongoDB integration.

Implemented API routes in Next.js for handling CRUD operations.

## Testing
Unit Tests:
Included unit tests to ensure code quality and reliability.
Used Jest and Testing Library for writing and executing tests.


## Setup Instructions
### Clone Repository:

git clone https://github.com/fatimaasebbane/Thinkable-Challenge.git

cd Thinkable-Challenge

### Install Dependencies:

npm install

### Set Up Environment Variables:

Create a .env file in the root directory.

Add your MongoDB connection string:
DATABASE_URL=<your_mongodb_connection_string>

### Run the Application:
npm run dev

### Access the Application:
Open your browser and navigate to http://localhost:3000.
