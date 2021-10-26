# ViitorCloud Tip Manager

Steps to run the APIs:-

1.) Clone the project by using following command:-
    `git clone https://github.com/designerAman/viitorclound_tip_manager.git`

2.) Go inside the project directory using the following command:
    `cd viitorclound_tip_manager`

3.) Checkout to the develop branch using the following command:
    `git checkout develop`

4.) Install npm dependencies using following command:
    `npm ci`

5.) Create a database in MySql using root user, If you want to create this database with different user other than root, then follow next step

6.) If you want to create this database with different user other than root, than follow these steps:-
    i) Open the project with any text editor you want.
    ii.) Navigate to the src/config/environments/development.js file.
    iii.) Change the MySql User and password according to your mysql user and save the changes.

7.) If you are using root user but your root user password in not Root@123 then change the root user password in src/config/environments/development.js file, otherwise skip this step.

8.) Now run the following command to create all the required tables in tha database:
    `node src/run-database-migrations.js`

9.) Now all done, setup is completed, to run the project, use following command:
    `nodemon` or `node src/index.js`

10.) Now project is running on localhost:3000



Below is the postman collection of all the apis of this project.
    https://www.getpostman.com/collections/c9347d57da84b7a2b07e