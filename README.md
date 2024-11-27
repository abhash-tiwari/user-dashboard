# User Management Dashboard

## Project Overview

A React-based web application built with Vite for managing user details using the JSONPlaceholder API. This dashboard provides a comprehensive interface for viewing, adding, editing, and deleting user information with client-side form validation.

## Features

- View a list of users with detailed information
- Add new users through an intuitive form
- Edit existing user details
- Delete users from the list
- Client-side form validation for smooth user interaction

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

### Clone the Repository

```bash
git clone https://github.com/abhash-tiwari/user-dashboard
cd user-management-dashboard
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React**: User interface development
- **Vite**: Next-generation front-end tooling
- **Axios**: API request handling
- **JSONPlaceholder**: Mock API for user data
- **CSS**: Application styling

## Vite-Specific Configuration

This project is set up with Vite, providing:
- Extremely fast development server
- Instant hot module replacement (HMR)
- Out-of-the-box TypeScript support
- Optimized builds for production

## Challenges & Limitations

During development, several challenges were identified:

- **Limited Mock API**: Unable to persist data changes due to using a mock API
- **Error Handling**: Requires more robust error management
- **Loading States**: Need for visual feedback during data fetching and actions
- **State Management**: Potential for implementing global state management

## Future Enhancements

Potential improvements for the project include:

- Implement pagination for large user datasets
- Enhance form validation (e.g., email format checks)
- Develop responsive design for mobile compatibility
- Integrate comprehensive error handling
- Add global state management solution

## Contribution Guidelines

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
- Code follows project coding standards
- All tests pass
- Provide clear description of changes


## Contact

Abhash Tiwari
abhashhtiwary7610@gmail.com