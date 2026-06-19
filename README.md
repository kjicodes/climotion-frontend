# Climotion Frontend

React frontend for Climotion. A weather-aware workout planner. Search by city to get current conditions and an indoor/outdoor workout recommendation. Live and actively being developed - new features in progress.

**🔗 Live app:** [climotion-frontend.onrender.com](https://climotion-frontend.onrender.com) 
**Backend repo:** [climotion](https://github.com/kjicodes/climotion)


---

## Tech Stack

- React
- React Router
- Tailwind CSS
- Headless UI

---

## Features

- City search with popular city autocomplete suggestions
- Weather results displaying temperature, condition, feels like, and daily high/low
- AI-powered indoor/outdoor workout recommendation based on current weather
- User registration and login with persisted sessions (JWT-based)
- Dynamic background gradients that change per weather condition
- Responsive layout for mobile and desktop

---

## Running Locally

1. Clone and run the backend first, following its own README.

2. Create a `.env` file in this project's root:

`REACT_APP_API_URL=http://127.0.0.1:8000`

pointed at wherever your local backend is actually running.

3. Install dependencies and start the dev server:

```bash
npm install
npm start
```

---

## Screenshots

<img src="docs/screenshots/screenshot-home.png" alt="Climotion Home Page" width="600"/>

<img src="docs/screenshots/screenshot-register.png" alt="Climotion Register Page" width="600"/>

<img src="docs/screenshots/screenshot-login.png" alt="Climotion Log In Page" width="600"/>

