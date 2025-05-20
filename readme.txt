About my Project: This project is a rudimentary todo list that supports a variety of baseline features.  First, users can create and delete
                  various todo list items.  They can mark each item as done/undone and also view each todo list item filtering by "all", "done", and "notdone".


How to launch / run project:
1. After unzipping the project code, open a terminal and browse to the root directory of the project
   You can confirm you are there by running a "ls" command in the terminal, you should see server.js, /templates, and /resources
2. Run npm install
   This will install all the necessary packages defined within the package-lock.json filtering
   pug, mysql-await, express
3. Access/open the data.js file within the root directory.  Within this will be all necessary connection information to access my mysql database
   connectionLimit: 5,
   host: "127.0.0.1",
   user: "C4131F24U34",
   database: "C4131F24U34",
   password: "1206",
   Above are all the pieces needed to form the connection on the computer you are using. Please connect to the database as you would.
4. Run node server.js
   This executes the server.js file which begins hosting the webpage on the following link: http://localhost:4131/
5. Now access the url: http://localhost:4131/ and use the project

Debugging launch:
- If you aren't able to run the project due to dependencies not being installed, please install each necessary dependecy independently
    - run: npm install mysql-await, npm install pug, npm install express
- Depending on where you are running your code, you may need to chose a different host name for the mysql server: cse-mysql-classes-01.cse.umn.edu
    - This shouldn't be a problem though.
