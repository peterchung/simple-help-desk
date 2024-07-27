# Simple Help Desk

This is a full stack simple help desk application. In this application, users can submit help desk tickets and admins can review all submitted tickets and update tickets.

Click this [link](https://simple-help-desk.vercel.app/) to view the deployed application. This application was deployed using Vercel.

## Running in Development Mode

- Fork and clone repo
- npm install
- create a local .env file in root directory
- Add your own DATABASE_URL='your database URI' to the .env file
- npx prisma init to initiate Prisma
- npx prisma generate to generate the Prisma Client
- npx prisma db push to push the schema model to your db
- npm run dev

## About the Project

[![Typescript][TS.js]][TS-url][![Next.js][Next.js]][Next-url][![React][React.js]][React-url][![Postgres][Postgres]][Postgres-url][![Tailwind CSS][Tailwind CSS]][Tailwind-url]

### Features:

- Users can create and submit new tickets on the User Portal
- Admins can view a list of all submitted tickets on the Admin Portal
- Ticket table can be filtered based on ticket status and ticket priority
- Admins can open a ticket modal and update the ticket status and leave comments
- Navigation bar to navigate between User Portal, Admin Portal, and Home page

<br />
  <div align='center'>
    <header>Home Page</header>
    <p>Landing page where users can navigate to either the User Portal or Admin Portal</p>
    <img alt='Home page' src='/public/help-desk-home-page.png'>
    <header>User Portal</header>
    <p>User Portal where users can submit tickets</p>
    <img alt='User portal' src='/public/help-desk-user-portal.png'>
    <header>Admin Portal</header>
    <p>Admin Portal where users can view submitted tickets, filter by status or priority, and update tickets</p>
    <img alt='Home page' src='/public/help-desk-admin-portal.png'>
  </div>
<br />

## In Development:

- Login functionality with bcrypt hashing for both users and admins
- Allow admins to delete tickets
- Allow admins to sort ticket list based on date, status, or priority
- Ticket assignment functionality for admins
- Unit, integration, and end-to-end testing

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Tailwind CSS]: https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[TS.js]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white

[Postgres-url]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white](https://www.postgresql.org/)
[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
