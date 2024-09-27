### Autoserve - Junior Web Developer Tech Test

**Objective:**

Create a simple web application using **React**, **Prisma**, and a **SQL database** (of your choice) that retrieves and displays vehicle details (e.g., specifications, mileage, fuel type, etc.) via API calls. The project will test your skills in frontend development, API integration, database schema design, and working with an ORM (Prisma).

## Installation

To run the application locally, it can be invoked by entering the following commands line by line into your terminal / CLI

```

git clone git@github.com:faisal244/autoserve.git

cd autoserve

npm install

npm run build

npm start

```

#### **Project Requirements:**

1. **Frontend (React):**

-   Build a simple React web interface that allows users to:

-   View a list of vehicles.

-   Select a vehicle to see detailed information.

-   Use hooks (`useEffect`, `useState`) and functional components.

-   Style the interface using **CSS** or a **CSS framework** like **Tailwind** or **Bootstrap** (optional).

#### **Tech Stack:**

-   **Frontend:**

-   React (hooks, functional components)

-   Optional: Any styling framework or CSS-in-JS solution

-   **Backend:**

-   Node.js with **Next.js**

-   Prisma ORM

-   SQL Database (e.g., SQLite, PostgreSQL, MySQL)

#### **Steps to Complete the Project:**

1. **Frontend Development:**

-   Build a React frontend that fetches data from the two (preconfigured) API endpoints:

1. `GET /api/vehicles` – returns a list of all vehicles.

2. `GET /api/vehicles/:id` – returns details of a single vehicle by ID.

-   Display a list of vehicles, including basic info such as:

-   Make

-   Model

-   Year

-   Price

-   When a vehicle is clicked, show detailed information about the selected vehicle (e.g., fuel type, mileage, transmission).

#### **Bonus (Optional):**

-   Display a loading spinner while data is being fetched.

-   Implement **search** or **filtering** by vehicle attributes (e.g., make, year, fuel type).

---

#### **Deliverables:**

-   The full source code hosted on GitHub, including:

-   React frontend code.

-   API code (backend).

-   Prisma schema and migrations.

-   Instructions on how to run the project locally (README file).

#### **Evaluation Criteria:**

-   Code organization and structure.

-   Use of React best practices (hooks, state management).

-   Clean and intuitive UI/UX (doesn't need to be fancy).

-   Bonus: Any additional features such as searching, filtering, or loading.

---
