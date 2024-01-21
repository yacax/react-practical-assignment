# React Front-End Web Application

## Overview

This project involves developing a front-end for a web application. The goal is to create a user-friendly interface for a web service with authentication and interactive features. A skeleton for the client-side and a fully functional NodeJS back-end are provided. The main focus is on the front-end, built using React and Redux.

### Features

- **User Authentication**: Login system with username only (no password).
- **Main Display**: Includes a header, a filterable gallery of posts with functionalities like creating, editing, deleting, liking, and disliking posts and comments.
- **Responsive Design**: The layout adjusts to various screen sizes, ensuring a consistent user experience across devices.

### Deployment

This application has been deployed and is accessible at [Postit - react-practical-assignment](https://yacax.github.io/react-practical-assignment/).

## Initial repository and base task

- Fork the initial repository: [InitechSoftware/react-practical-assignment](https://github.com/InitechSoftware/react-practical-assignment).
- The server API has already been implemented. Only minor changes have been made for the deployment.
- The client-side is a skeleton with some basic functionality. The goal is to implement the missing features and improve the existing ones.

### Requirements

- Support actions like creating, editing, deleting, liking, and disliking posts and comments.
- Implement a login display with username input and a login button.
- The main page should display the current user's name, a logout button, and a gallery of posts.
- Use a filter/search feature to display posts based on keywords.
- Implement pagination for post display.
- Ensure responsive design for the post cards.
- Modal implementations for adding or editing posts and comments.

### PS Please find the original README.md file text below

Structure:
This project conatains two application:

- server app (inside of './server' folder)
- client app (inside of './client' folder)

Task related to client app. So, everything what you have to do you will do it inside of './client' folder

Steps:

1. Download and install node here - https://nodejs.org/en/ (if needed)
2. Open project using VSC or some other code editor
3. Run command in terminal (inside of this folder): npm run setup (it should install all dependencies)
4. Run commant in terminal (inside of this folder): npm run start_server (it should start server app)
5. Open additional terminal and run command: npm run start_client (it should start client app)

API
Client app should use api provided by server app.
Here is endpoints description:

MAIN_URL = http://localhost:8080/

CREATE POST:
url: MAIN_URL + 'post/'
method: post
body: {
title: <string>,
username: <string>
}
response: {
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}

UPDATE POST
url: MAIN_URL + 'post/{id}'
method: put
body: {
title?: <string>,
likes?: Array<<string>>,
dislikes?: Array<<strings>>
}
response: {
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>>
dislikes: <Array<string>>
date: <number>,
comments: <Array<Comment>>
}

FILTER/SEARCH POSTS BY KEYWORD
url MAIN_URL + 'post/search/${keyWord}'
method: get
response: [
{
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}
...
]

GET POSTS BY PAGES (9 posts per page)
url MAIN_URL + 'post/page/${pageNumber}' // pageNumber > 0
response: [
{
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}
...
]

- response conains additional information: totalPages, total and page

DELETE POST
url: MAIN_URL + 'post/{id}'
method: delete
response: {
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}

UPLOAD POST PICTURE
url: MAIN_URL + 'post/{id}/picture'
method: post
body: FormData // should contain file like this formData.append("picture", file);
response: {
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}

CREATE COMMENT
url: MAIN_URL + 'comment'
method: post
body: {
text: <string>,
postId: <number>,
username: <string>,
}
response: {
id: <number>,
text: <string>,
postId: <number>,
username: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
date: <number>
}

UPDATE COMMENT
url: MAIN_URL + 'comment/{id}'
method: put
body: {
text: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
}
response: {
id: <number>,
text: <string>,
postId: <number>,
username: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
date: <number>
}

DELETE COMMENT
url: MAIN_URL + 'comment/{id}'
method: delete
response: {
id: <number>,
text: <string>,
postId: <number>,
username: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
date: <number>
}

=============== i hope next endpoints will shouldn't be used, but i'll left it here, just in case ====================

GET ALL POSTS
url: MAIN_URL + 'post'
method: get
response: [
{
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}
...
]

GET POST
url: MAIN_URL + 'post/{id}'
method: get
response: {
id: <number>,
title: <string>,
username: <string>
likes: <Array<string>> //usernames
dislikes: <Array<string>> //usernames
imageSrc: <string> //path
date: <number>,
comments: <Array<Comment>>
}

GET COMMENT
url: MAIN_URL + 'comment/{id}'
method: get
response: {
id: <number>,
text: <string>,
postId: <number>,
username: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
date: <number>
}

GET COMMENTS
url: MAIN_URL + 'comment'
method: get
response: [
{
id: <number>,
text: <string>,
postId: <number>,
username: <string>,
likes: <Array<strings>>,
dislikes: <Array<strings>>,
date: <number>
},
...
]
