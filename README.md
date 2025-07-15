# 💼 Micro-Task and Earning Platform

A complete MERN-stack powered micro-tasking and earning platform designed for three different user roles: **Worker**, **Buyer**, and **Admin**. Inspired by sites like Picoworkers and Clickworker, this platform enables users to post tasks, complete them, and earn/purchase virtual coins which are convertible to real-world payments.

🔗 Live Site: https://coin-crafter-c3107.web.app/  
🧑‍💼 **Admin Email:** admin@admin.com  
🔐 **Admin Password:** 123456  

---

## 🔥 Key Features

1. 🔐 Role-based Authentication with Google and Email+Password (Worker / Buyer / Admin)
2. 🎨 Responsive Home Page with Swiper Slider, AOS animation, testimonials, best workers & 4 extra creative sections
3. 🧑‍💻 Worker Dashboard with:
   - Task list & submission system
   - View approved submissions
   - Withdraw coins (20 coins = $1)
   - Earnings & withdrawal tracking
4. 💼 Buyer Dashboard with:
   - Add tasks with coin deduction & imgBB image upload
   - Manage & review worker submissions
   - Approve/Reject logic with auto coin refill
   - Purchase coins via **Stripe payment**
   - View payment history
5. 🛠️ Admin Dashboard with:
   - View platform statistics
   - Manage all users and roles
   - Approve withdrawal requests (coin deduction)
   - Delete tasks from the system
6. 💸 Coin economy implemented:
   - Buyer: 10 coins = $1
   - Worker: 20 coins = $1 (platform earns profit)
7. 📦 Secure Stripe integration for real payments (Test Mode)
8. 📁 Environment variables for Firebase, Stripe, MongoDB (using `.env`)
9. 📲 Fully responsive design (Mobile, Tablet, Desktop)
10. 💻 Smooth UI using **TailwindCSS**, **DaisyUI**, and **React Icons**

---

## 🛠️ Tech Stack

### 🔹 Client (Frontend)
- [Vite](https://vitejs.dev/)
- [React.js](https://reactjs.org/)
- [React Router ](https://reactrouter.com/)
- [Swiper](https://swiperjs.com/)
- [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Axios](https://axios-http.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

### 🔹 Server (Backend)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [Stripe Payment Integration](https://stripe.com/)

---

## 🚦 User Roles and Permissions

| Role   | Access                                                                 |
|--------|------------------------------------------------------------------------|
| Worker | View/Submit Tasks, Track Submissions, Withdraw Coins                  |
| Buyer  | Post Tasks, Manage Submissions, Purchase Coins, View Payment History  |
| Admin  | Manage All Users, Tasks, Withdrawals, System Stats                    |

---



💡 Design Strategy
Unique UI design with consistent color and layout

Fully mobile-first responsive layout

No use of dummy lorem ipsum content

Reusable and modular components for maintainability

📌 Bonus Implementations
✅ imgBB Image Upload on Registration & Task Creation

✅ Auto coin credit after user registration based on role (Worker: 10, Buyer: 50)

✅ Real-time Role Management from Admin panel


✅ Stripe Test Mode integration with 4 demo packages

📣 Contact
Developed by MD Yasin
📧 Email: mdyasin48902@gmail.com
🔗 GitHub: [github.com/yasin-dev](https://github.com/mdyasin0)