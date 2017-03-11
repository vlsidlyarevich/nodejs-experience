# nodejs-experience
Fullstack javascript-based blog-app. Backend is written on node v7.5.0, and client is written in pure javascript/html/css

### Requirements
* install node packet manager: type `apt-get update && sudo apt-get install npm`
* install nodejs: `npm install nodejs`
* install mongoDB: `sudo apt-update && sudo apt-get -y install mongodb`

### Running
* open terminal in app root directory
* type `npm install`
* type `npm start` to start app

---

### Description

This application is a simple blog, which allows to create posts, write comments to the posts,
register users. 

The project includes users of three category: **admin**, **user** and **anonymous**.
* **Anonymous** has possibility to review posts.
* **User** also has possibility to create posts and write comments.
* **Admin** also has possibility to edit and delete posts' and users' info.

---

### API

#### Authentication api

* POST `/api/auth` - authenticate user 

#### Sign up api

* POST `/api/signup` - register user

#### Users' api

* GET `/api/users` - get all users
* GET `/api/users/id` - get user by id
* POST `/api/users` - create user 
* PUT `/api/users/id` - update user by id
* DELETE `/api/users/id` - delete user by id

#### Posts' api

* GET `/api/posts` - get all posts
* GET `/api/posts/id` - get post by id
* POST `/api/posts` - create post
* PUT `/api/posts/id` - update post by id
* DELETE `/api/posts/id` - delete post by id

#### Comment's api 

* GET `/api/posts/id/comments` - get all post's comments
* POST `/api/posts/id/comments` - create comment
* PUT `/api/posts/id/comments/id` - update comment
* DELETE `/api/posts/id/comments/id` - delete comment


