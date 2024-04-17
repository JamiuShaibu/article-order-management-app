# Article Order Management App

## Overview

A React-based web application for managing articles and orders. This project includes features like CRUD operations for articles and orders, with a user-friendly interface built using Tailwind CSS.

## Features

- **Article Management**: Create, and update articles.
- **Order Management**: Create orders with articles, calculate total prices.
- **Responsive Design**: Fully responsive UI design.
- **Data Persistence**: Uses JSON Server for backend data storage.

## Tech Stack

- React
- Tailwind CSS
- JSON Server
- Axios
- Docker
- Jest (for testing)
- npm (Node Package Manager)

# Setup

##### Clone the repository:

```
git clone https://github.com/JamiuShaibu/article-order-management-app.git
```

### Docker Setup

##### 1. Navigate to project directory:

```
cd article-order-management-app
```

##### 2. Build & run docker image:

```
sudo docker compose up
```

## Don't have Docker?

### Local Development

##### 1. Navigate to project directory:

```
cd article-order-management-app
```

##### 2. Install dependencies:

```
npm install
```

##### 3. Open another terminal and navigate to project directory to run the JSON server:

```
npx json-server --watch data.json --port 8000
```

##### 4. npm run dev:

```
npm run dev
```

#### Access live project

Open your browser and go to http://localhost:5173

#### API Endpoints:

- **Articles: `/articles`**
- **Orders: `/orders`**

###### Developer:

**_Jamiu Shaibu_**
