# Contact Application

This is a simple web application that allows users to link a contact to a client. It fetches data from an API that provides both clients and contacts, stored in a MongoDB database. Users can select and link a contact to a client. This application uses **React** and **Next.js** for the frontend, **MongoDB** for the database, and communicates with an API to fetch and link data.

## Features

- **Fetch Contacts and Clients**: Fetches a list of contacts and clients from a MongoDB database via an API.
- **Link Contact to Client**: Allows users to select a contact and a client from dropdowns and link them together.
- **Dynamic UI**: Displays dynamic dropdowns for selecting a contact and a client.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.

## Technologies Used

- **Next.js** - React framework for building the web application.
- **React** - JavaScript library for building user interfaces.
- **MongoDB** - NoSQL database for storing client and contact data.
- **Tailwind CSS** - A utility-first CSS framework for styling.
- **Node.js** - JavaScript runtime used for the server-side API.
- **Fetch API** - Used to communicate with the backend API to fetch contacts and clients and to link them.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/link-contact-client.git
   npm install
   npm run dev
