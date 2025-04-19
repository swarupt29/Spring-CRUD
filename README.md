---

## Spring-CRUD 🖥️✨

Welcome to the **Spring-CRUD** project! 🚀 This is a modern, responsive web application built using **Spring Boot** for the backend, **MySQL** as the database, and a beautiful, interactive frontend created with **HTML**, **CSS**, and **JavaScript**. This project enables you to perform **CRUD** (Create, Read, Update, Delete) operations in a user-friendly environment.

## 📋 Table of Contents

1.  [Features](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-features)
2.  [Technology Stack](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-technology-stack)
3.  [Getting Started](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-getting-started)
4.  [Screenshots](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-screenshots)
5.  [API Endpoints](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-api-endpoints)
6.  [Project Structure](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-project-structure)
7.  [Contributing](https://chatgpt.com/c/68039d5f-1acc-8001-84c3-5177a4f2f2e2#-contributing)

## ⚡ Features

*   **Complete CRUD Operations**: Create, Read, Update, and Delete entities via a simple and intuitive interface.
*   **Modern UI**: A responsive and interactive frontend with animations, built using HTML, CSS, and JavaScript.
*   **Backend with Spring Boot**: A RESTful API backend using Spring Boot, Spring Data JPA, and MySQL.
*   **Database Integration**: Stores data in a MySQL database, making it easily scalable.
*   **Responsive Design**: The application is fully responsive and looks great on any device (desktop, tablet, mobile).
*   **Enhanced User Experience**: With animated transitions and dynamic updates.

## 💻 Technology Stack

### Frontend:

*   **HTML5** for structuring the web pages.
*   **CSS3** for styling the application (Responsive design, Flexbox, Grid, Animations).
*   **JavaScript** (Vanilla JS) for dynamic behavior and interaction.

### Backend:

*   **Spring Boot** for the RESTful backend.
*   **Spring Data JPA** for database interaction.
*   **MySQL** for data storage.

### Database:

*   **MySQL** (Make sure you have MySQL installed and set up properly).

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### 1\. Clone the Repository

Clone this repository to your local machine using the following command:

```plaintext
git clone https://github.com/swarupt29/Spring-CRUD.git
```

### 2\. Set up MySQL Database

1.  **Create a Database**: Open MySQL and create a database named `springcruddb`.

```plaintext
CREATE DATABASE crud;
```

1.  **Configure Database Connection**: Open `src/main/resources/application.properties` and update the database connection settings as per your local MySQL configuration:

```plaintext
spring.datasource.url=jdbc:mysql://localhost:3306/crud?createDatabaseIfNotExist=true
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true
```

### 3\. Build and Run the Application

1.  **Build the Project**: Navigate to the project directory and run the following Maven command to build the project:

```plaintext
mvn clean install
```

1.  **Run the Application**: Start the application with:

```plaintext
mvn spring-boot:run
```

The backend will be accessible at `http://localhost:8080`.

### 4\. Open the Application

Visit `http://localhost:8080` in your browser to view the frontend and start using the app.

## 📸 Screenshots

Here are some screenshots to showcase the application. (Replace these placeholders with actual screenshots once you have them).

### Main Dashboard

![Image](https://github.com/user-attachments/assets/bebd67f0-447b-4d90-a8b5-88dc5a2a9d71)

### Update Entity

![Image](https://github.com/user-attachments/assets/006cbaa2-021e-48aa-9adf-ad5b6e9144ac)

### Delete Entity

![Image](https://github.com/user-attachments/assets/35aac7cf-c048-48ae-b698-c63aef6b6c18)

### Light Mode

![Image](https://github.com/user-attachments/assets/b65ad728-97d3-4855-8e6d-55abb3293f5a)

### List View

![Image](https://github.com/user-attachments/assets/b8406236-1ac7-4998-a65c-91da6e16f6fc)

## 📱 API Endpoints

The backend exposes the following API endpoints for performing CRUD operations:

### 1\. **Create an Entity**

```plaintext
POST /api/
```

*   **Body**: JSON object with entity details.
*   **Example**:
    
    ```plaintext
    {
      "name": "Entity Name",
      "age": "Entity Age.",
      "city": "Entity City."
    }
    ```
    

### 2\. **Get All Entities**

```plaintext
GET /api/entities
```

*   **Response**: List of all entities in JSON format.

### 3\. **Get Entity by ID**

```plaintext
GET /api/{id}
```

*   **Response**: Entity details in JSON format.

### 4\. **Update an Entity**

```plaintext
PUT /api/{id}
```

*   **Response**: JSON object with updated entity details.  
     

### 5\. **Delete an Entity**

```plaintext
DELETE /api/{id}
```

*   **Response**: Status of the delete operation.

## 🗂️ Project Structure

Here is the structure of the project:

```plaintext
Spring-CRUD/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── crud/
│   │   │               ├── controller/
│   │   │               │   └── EntityController.java
│   │   │               ├── model/
│   │   │               │   └── Entity.java
│   │   │               ├── repository/
│   │   │               │   └── EntityRepository.java
│   │   │               └── service/
│   │   │                   └── EntityService.java
│   │   ├── resources/
│   │   │   ├── application.properties
│   │   │   ├── static/
│   │   │       ├── index.html/
│   │   │       ├── script.js/
│   │   │       └── style.css/
├── pom.xml
```

### Key Directories:

*   **Controller**: Contains REST API controllers for managing CRUD operations.
*   **Model**: Entity classes representing database tables.
*   **Repository**: JPA repository interfaces for database access.
*   **Service**: Contains the business logic for CRUD operations.

## 🤝 Contributing

Contributions are always welcome!

---

🎉 **Thank you for checking out Spring-CRUD!** 🎉

---
