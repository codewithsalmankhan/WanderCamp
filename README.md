
# WanderCamp 🌲🏕️

Welcome to **WanderCamp**, your go-to platform for finding and reviewing the best camping spots worldwide! Whether you're looking for your next adventure or sharing your camping experiences, WanderCamp has everything you need.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Setup and Installation](#-setup-and-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- 🌍 **Interactive Map**: Discover campgrounds on a dynamic map powered by Mapbox.
- 🖼️ **Image Uploads**: Share stunning visuals of your favorite campsites via Cloudinary.
- 🛡️ **Secure and Scalable**: Built with best practices for data security and scalability.
- 📝 **User Authentication**: Register, log in, and manage your contributions.
- 🔍 **Search and Filter**: Easily search campgrounds by name or location.
- 🖊️ **Full CRUD Operations**: Manage campgrounds and reviews with a user-friendly interface.

---

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Passport.js (authentication)

### Frontend
- EJS (Embedded JavaScript Templates)
- Bootstrap (responsive design)

### APIs and Tools
- Mapbox API (maps and geolocation)
- Cloudinary (image hosting)
- Helmet.js (security headers)

---

## ⚙️ Setup and Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) account
- [Mapbox](https://www.mapbox.com/) API key

### Steps to Run the Project Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/codewithsalmankhan/WanderCamp.git
   cd WanderCamp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   DB_URL=your_mongodb_connection_string
   MAPBOX_TOKEN=your_mapbox_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   SECRET=your_secret_key_for_sessions
   ```

4. Start the application:
   ```bash
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📖 Usage

1. **Browse Campgrounds**: Explore the listed campgrounds on an interactive map.
2. **Create an Account**: Sign up to add or manage your contributions.
3. **Add Campgrounds**: Share your favorite camping spots with photos, descriptions, and locations.
4. **Write Reviews**: Rate and review campgrounds to help others.
5. **Manage Content**: Edit or delete your campgrounds and reviews.

---

## 🗂️ Project Structure

```
WanderCamp/
├── public/               # Static files (CSS, JS, images)
├── routes/               # Application routes
├── views/                # EJS templates
├── models/               # Mongoose models
├── middleware/           # Custom middleware
├── .env                  # Environment variables
├── app.js                # Main application entry point
├── package.json          # Project dependencies
```

---

## 📷 Screenshots

### Home Page
![Home Page Screenshot](https://via.placeholder.com/800x400)

### Campground Details
![Campground Details Screenshot](https://via.placeholder.com/800x400)

---

## 🌟 Future Improvements

- Add user profiles with avatars and camping history.
- Implement advanced search filters (e.g., by amenities or rating).
- Integrate a "Favorites" feature for users to save campgrounds.
- Support for booking campsites through third-party APIs.
- Improve mobile responsiveness for an enhanced user experience.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---