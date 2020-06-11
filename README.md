# SuperSupport-React App

This is a customer support application that allows for 3 user roles: Admin, Agents and Customers. Admins can make other users Admins and can see all tickets created on the system. Agents can change the status of a ticket and can leave comments on tickets. Customers cannot comment on a ticket till an Agent or Admin has commented on it.

## Technologies used in this API

- React
- Ruby-on-Rails
- Redux toolkit
- Bootstrap
- React Bootstrap

## Getting Started

**To get started, follow the instructions below**

To get a local copy up and running follow these simple example steps.

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

### Planned Features

- Implement test
- Improve styling
- Fix issues with user logout but page still rendering in the DOM
- Refactor components to make them more reusable

## Authors

👤 **Adebola Adeniran**

- Github: [@githubhandle](https://github.com/onedebos)
- Linkedin: [linkedin](https://www.linkedin.com/in/adebola-niran/)
- Portfolio: [portfolio](https://www.adebola.dev/)

## 📝 License

This project is [MIT](lic.url) licensed.

```

```
