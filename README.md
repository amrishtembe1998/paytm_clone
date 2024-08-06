
## A basic version of PayTM
Tech stack used:
* Frontend: ReactJS(Vite) + Tailwind CSS
* Backend: NodeJS + Express + Mongoose ODM
* Database: MongoDB
Project covers basic functionalities like
1. Signup
2. SignIn
3. JWT based authentication
4. Dashboard to view users
5. Send money
6. debouncing for search result

Lot of Improvements to be made like
1. OTP based authentication
2. Popup for errors
3. Notification for receiver when amount received.
etc.

To try out the application in local,
1. Create an account on MongoDB website or use MongoDB atlas locally to connect to the database.
2. Insert your MONGODB_URL in db.js file in backend folder.
3. Navigate to backend folder. Do `npm install` followed by `npm start`. This will start up the backend server on port 3000.
4. Navigate to frontend folder. Do `npm install` followed by `npm run dev`. This will start up the frontend on port 5173.
5. You can access the application on `http://localhost:5173/signup`.

Some of the screenshots of the app.
1. Sign up page:
   ![image](https://github.com/user-attachments/assets/6d0df7a1-8e99-47a9-9ed2-28cda0976350)
2. Sign in page:
   ![image](https://github.com/user-attachments/assets/8ef3274e-4063-41b5-8767-fba0124c75b1)
3. Dashboard page:
   ![image](https://github.com/user-attachments/assets/6520c888-5f4c-406c-9609-70d0fcb2a109)
4. Send money page:
   ![image](https://github.com/user-attachments/assets/310b4008-095d-4c69-9a9e-07413080d31b)



