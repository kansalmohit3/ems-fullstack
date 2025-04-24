module.exports = {
    routes: [
      {
        method: "GET",
        path: "/my-profile",
        handler: "employee.myProfile",
        config: {
          auth: true,
        },
      },
    ],
  };
  