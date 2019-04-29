# gungeon-database
A small repository for information about the roguelike Enter the Gungeon, built using Nodejs, MySQL and ReactJS. Inspired by http://gungeongod.com/

The repository uses a proxy host to connect the server.js with client.

Users can hover over the pictures displayed to view a description of the gun. User can also login to the database, which currently adds their login credentials to the database.

Upcoming features:

> admin registration and improved valiadation/sanitation for login credentials.

> allowing logged-in admins to contribute by posting new guns and descriptions from their directory

> more guns! more items!


How to run:

1) clone the repository, run `yarn` in terminal in the root directory
2) `cd client` and run `npm install` to install the necessary node modules for clientside
3) in the client directory, run `npm run build-css`
3) run gungeon-database.sql in your root directory locally, update utils/database.js with the username and password of your database session
4) Run `yarn dev` in the root directory
