
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

Lot of Improvements to be made like
1. debouncing for search result
2. OTP based authentication
3. Popup for errors
4. Notification for receiver when amount received.
etc.

To try out the application in local,
1. Create an account on MongoDB website or use MongoDB atlas locally to connect to the database.
2. Insert your MONGODB_URL in db.js file in backend folder.
3. Navigate to backend folder. Do `npm install` followed by `npm start`. This will start up the backend server on port 3000.
4. Navigate to frontend folder. Do `npm install` followed by `npm run dev`. This will start up the frontend on port 5173.
5. You can access the application on `http://localhost:5173/signup`.
