# SuperSupport-React App

This is a customer support application that allows for 3 user roles: Admin, Agents and Customers. Admins can make other users Admins and can see all tickets created on the system. Agents can change the status of a ticket and can leave comments on tickets. Customers cannot comment on a ticket till an Agent or Admin has commented on it.

Agents and Admins can also generate PDF reports based on closed tickets.

## Technologies used in this API

- React
- Ruby-on-Rails
- Redux toolkit
- Bootstrap
- React Bootstrap

## video demo

![video_demo](/supersupport.gif)

## Getting Started

**To get started, follow the instructions below**

- Before running the other commands, ensure the Rails API is running by navigating to the Rails API directory and running

```
rails s
```

- Ensure you have Node at >=11.14.0.

- In the root of the application, install the required packages by running

```
yarn install
```

- Once completed, start the application by running

```
npm start
```

- Ensure you have your rails app running at the same time. For this FrontEnd app to work with the Rails API, ensure that the React app is running on PORT 3001. If you encouter CORS issues with CORS, head into the `config/initializers/cors.rb` file in the Rails API app and add your PORT there.

### Automated Tests

- There are currently no automated tests for this app.

### Planned Features if given more time

- Implement tests
- Improve styling
- Load tickets for reports on Admin sign in to reduce loading screens and time across the App.
- Implement ProtectedRoutes

### Problems

- Couldn't persist user state on refresh using redux + JWT but the verification endpoint has been created on the API.

### Notes

- Only ADMIN users can generate PDF reports
- Only ADMIN users can set other users as admin

## Authors

👤 **Adebola Adeniran**

- Github: [@githubhandle](https://github.com/onedebos)
- Linkedin: [linkedin](https://www.linkedin.com/in/adebola-niran/)
- Portfolio: [portfolio](https://www.adebola.dev/)

## 📝 License

This project is [MIT](lic.url) licensed.

```

```
