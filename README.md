# Vacancy Manager

## Description

Web application for managing job openings, allowing you to view, filter, edit, and delete records in a simple and interactive way.
It supports filters by job title, location, company, job type, status, and dates, as well as dynamic sorting by any column.

## Technologies Used

<ul>
<li>Frontend: React, Css, Vite
<li>Backend: Node.js, Express, cors,dotenv,GraphQL, Nodenon
<li>Tests: Jest ,SuperTtest
<li>Database: MongoDB

</ul>

## Project Structure

```
├── 📁 backend
│   ├── 📁 db #Connection with database
│   │   └── 📄 database.js
│   ├── 📁 graphql # Everything related with GraphQL
│   │   ├── 📁 types # Types used in the querries
│   │   │   ├── 📄 businessInputType.js
│   │   │   ├── 📄 businessType.js
│   │   │   ├── 📄 vacancyInputType.js
│   │   │   └── 📄 vacancyType.js
│   │   ├── 📄 RootMutationType.js # Mutation Querries
│   │   └── 📄 RootQueryType.js # Root Queries
│   ├── 📁 modules # All the features
│   │   ├── 📁 business
│   │   │   ├── 📄 business.model.js
│   │   │   ├── 📄 business.repository.js
│   │   │   └── 📄 business.service.js
│   │   └── 📁 vacancy
│   │       ├── 📄 vacancy.model.js
│   │       ├── 📄 vacancy.repository.js
│   │       └── 📄 vacancy.service.js
│   ├── 📁 tests
│   │   ├── 📄 business.test.js
│   │   ├── 📄 root.test.js
│   │   └── 📄 vacancy.test.js
│   ├── ⚙️ .gitignore
│   ├── 📄 app.js
│   ├── 📄 jest.config.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── 📄 server.js
├── 📁 client
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   └── 🖼️ react.svg
│   │   ├── 📁 components
│   │   │   ├── 📁 addBusinessButtonComponent
│   │   │   │   ├── 📄 AddBusinessButton.tsx
│   │   │   │   ├── 🎨 AddButtonStyle.css
│   │   │   │   └── 📄 CloseIcon.tsx
│   │   │   ├── 📁 addVacancyButtonComponent
│   │   │   │   ├── 🎨 AddButtonStyle.css
│   │   │   │   ├── 📄 AddVacancyButton.tsx
│   │   │   │   └── 📄 CloseIcon.tsx
│   │   │   ├── 📁 filterComponent
│   │   │   │   ├── 📄 Filter.tsx
│   │   │   │   └── 🎨 FilterStyle.css
│   │   │   └── 📁 tableComponent
│   │   │       ├── 📄 DeleteVacancyButton.tsx
│   │   │       ├── 📄 EditableTh.tsx
│   │   │       ├── 📄 Table.tsx
│   │   │       └── 🎨 TableStyle.css
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── ⚙️ .gitignore
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   └── 📄 vite.config.ts
├── ⚙️ .gitignore
└── 📝 README.md
```

## Features

<ul>
<li>List of vacancies </li>
<li>Filter by: </li>
  <ul>
    <li>Position </li>
    <li>Location </li>
    <li>Time of Application </li>
    <li>Time of Response </li>
    <li>Type of Employment</li>
    <li>Status </li>
    <li>Business Name </li>
  </ul>
  <li>Order by: </li>
  <ul>
    <li>Arrows indicate the direction of sorting (↑ increasing / ↓ decreasing) </li>

  </ul>
  <li>Edit on click </li>
  <ul>
    <li>Text fields, link and selection (status and job type) </li>

  </ul>
  <li>Delete vacancie </li>
  <li>Responsive and intuitive interface </li>
</ul>

## How to Run Locally

### Prerequisites

<ul>
<li>Node.js
<li>MongoDB
</ul>

Steps

1. Clone the repository

```
git clone https://github.com/Gr33d0/tabelaDeCandidaturas.git
```

2. Backend

```
cd backend
npm install
npm run start
```

3. Frontend

```
cd frontend
npm install
npm start
```

4. Set environment variables:

```
MONGODB_URI = your_mongo_URL
PORT = your_port
```

## Backend Documentation

### Root Queries

  <li>
  Businesses
  </li>

Fetch all Businesses:
`businesses: [BusinessType]`
<br>
Fetch Business by ID:
`business(id: ID!): BusinessType`
<br>

  <li>
  Vacancies
  </li>
Fetch all Vacancies: 
`vacancies(where: VacancyWhereInput): [VacancyType]`
<br>
Fetch Vacancy by id:
`vacancy(id: ID!): VacancyType`
<br>

### Mutation Queries

  <li>
  Businesses
  </li>

Create Business:
`createBusiness(input: BusinessInputType!): BusinessType`
<br>
Update Business:
`updateBusiness(id: ID!, input: BusinessInputType!): BusinessType`
<br>
Delete Business:
`deleteBusiness(id: ID!): String!`

  <li>
  Vacancies
  </li>
Create Vacancy: 
`createVacancy(input: VacancyCreateInputType!): VacancyType`
<br>
Update Vacancy:
`updateVacancy(id: ID!, input: VacancyUpdateInputType!): VacancyType`
<br>
Delete Vacancy:
`deleteVacancy(id: ID!): String!`
