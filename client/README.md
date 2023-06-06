
This project is a mini version of the HouseTable home evaluation system that includes a risk calculation model for potential loans. It is built using Node.js, Sequelize ORM with MySQL, and React.js.

## Getting Started

### Prerequisites

- Node.js (version 17 or higher)
- React.js (version 18 or higher)
- MySQL

### Installation

1. Clone the repository:

git clone https://github.com/YOUR_USERNAME/housetable-mini-version.git


2. Install dependencies:

cd client
npm install


3. Create a MySQL database and update the config.js file in the server directory with your MySQL credentials.


4. Start the Node.js server:

cd server
node index


5. Open your browser and navigate to http://localhost:3000 to access the app.

## Backend Development

The backend is built using Node.js and Sequelize ORM with MySQL. It includes a House model with the following attributes: id, address, currentValue, loanAmount, and risk. The risk attribute is calculated based on a simplistic risk calculation model that takes into account the loan amount and the current value of the house. The POST /api/houses endpoint automatically calculates the risk when a new house record is created, and the PUT /api/houses/:id endpoint recalculates the risk whenever a house's currentValue or loanAmount is updated.

## Frontend Development

The frontend is built using React.js. It includes a form to submit a new house record, which includes fields for address and current value. Upon form submission, a request is made to the POST /api/houses endpoint. The newly created house's ID is displayed to the user after submission, and they can navigate to a page to view the house's details. The house detail view page fetches the house's details via the GET /api/houses/:id endpoint, and a form to update the house's details is implemented using the PUT /api/houses/:id endpoint.

## Conclusion

This mini version of the HouseTable home evaluation system is a simple yet effective demonstration of how to build a full-stack web application using Node.js, Sequelize ORM with MySQL, and React.js. It includes a simplistic risk calculation model for potential loans and provides a user-friendly interface for creating and updating house records.