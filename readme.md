

# Watch Operations A driver monitering Solution

 This is a project which was built for monitering driver vitals and providing alerts in case of any emergency incidents for personal monitering the driver


## Hosted Site

If you want to take a look around :\
Kindly visit <a href="https://watch-operations.vercel.app/">Watch Operations</a>


## Credentials for login 

Email     : watch.operations.operator1@gmail.com\
Password  : watchoperations



# So what is this project about ? 

This project was built as a prototype for the TM automotive seating company by a team from the vellore institue of technology , the objective was to build a system that could moniter the vitals of the driver and provide alerts to emergency and company personal in case of any accidents or any health incidents.This repository consists of the web development component of the project which was built by me which is responsible for showing the data from the sensors and to perform other tasks which will be stated below


Note : This repository consist of the webdev stuff only for the electronics and embedded part kindly refer to this 
<a href="https://github.com/js0nnn/smart-seat-2.0">Repo</a>


# Details Regarding the Project 

## Tech Stack

* Frontend : Nextjs,Tanstack
* Backend : Supabase
* Styling : Sass,shadcn,Recharts

##  So what can it do ? 

Note : before clicking on the link kindly ensure you are logged in inorder to view the pages enter the 
[credentials](#credentials-for-login)

* In the <a href="https://watch-operations.vercel.app/Dashboard">Dashboard</a> it shows the data which is queried from supbase which is responsible for storing the sensor data
* In the <a href="https://watch-operations.vercel.app/Logs">Logs</a> a user can query for the logs or alerts for a specific time duration for inspection purpose or view the most recent logs to observe if there are any annomalies in the readings
* In the <a href="https://watch-operations.vercel.app/Accounts">Accounts</a> to view the details of the current logged in user
* In the <a href="https://watch-operations.vercel.app/Alerts">Alerts</a> this page consists of reading from the sensors and the priority of the alerts marked by the system to alert the user in case of any unforseen incident


## So how does the entire system work ?

![Flow chart for the working of the driver monitering system](/content/flowchart.png)

## Contents :

```text
.
├── components.json
├── content
├── data_generator
│   └── data generator.py  -> responsible for generating test data (random data ofc)
├── drizzle.config.ts
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
│   └── images
│       ├── blackeye.svg
│       └── orbital.svg
├── readme.md
├── src                         -> consists of the main application code
│   ├── app
│   │   ├── (auth)
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   ├── (main)
│   │   │   ├── Accounts
│   │   │   │   ├── loadings.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── Alerts
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── Dashboard
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── Logs
│   │   │       ├── loading.tsx
│   │   │       ├── LogTable
│   │   │       │   ├── [additionalinfoid]
│   │   │       │   │   ├── loading.tsx
│   │   │       │   │   └── page.tsx
│   │   │       │   ├── loading.tsx
│   │   │       │   └── page.tsx
│   │   │       └── page.tsx
│   │   └── not-found.tsx
│   ├── assets
│   │   ├── alert.png
│   │   ├── Dashboard.png
│   │   ├── space.png
│   │   ├── status.png
│   │   └── whiteeye.svg
│   ├── components                                  -> consists of the components related 
│   │   ├── About                                      to each page  where each folder consists 
│   │   │   ├── loading.tsx                            of a tsx file consisting of the implementation along 
│   │   │   └── page.tsx                               with the stylingrelated to the                             
│   │   ├── about-page                                 component     
│   │   │   └── card component
│   │   │       ├── card-component.module.scss
│   │   │       └── card-component.tsx
│   │   ├── accounts-page
│   │   │   └── accounts-card
│   │   │       ├── account-card.module.scss
│   │   │       └── account-card.tsx
│   │   ├── alerts-page
│   │   │   └── alertscard
│   │   │       ├── alertscard.module.scss
│   │   │       └── alertscard.tsx
│   │   ├── dashboard-page
│   │   │   ├── date-and-time-card
│   │   │   │   ├── date-and-time-card.module.scss
│   │   │   │   └── date-and-time-card.tsx
│   │   │   ├── drowsiness-and-seatstatus-card
│   │   │   │   ├── drowsiness_and_seat_status.module.scss
│   │   │   │   └── drowsiness_and_seatstatus.tsx
│   │   │   ├── four-data-card
│   │   │   │   ├── four-data-card.module.scss
│   │   │   │   └── four-data-card.tsx
│   │   │   └── google-maps
│   │   │       ├── google-maps.module.scss
│   │   │       └── google-maps.tsx
│   │   ├── dynamic-drivers-log
│   │   │   └── static-google-maps
│   │   │       ├── static-google-maps.module.scss
│   │   │       └── static-google-maps.tsx
│   │   ├── footer
│   │   │   ├── footer.module.scss
│   │   │   └── footer.tsx
│   │   ├── login-page
│   │   │   ├── login form
│   │   │   │   ├── login-form.module.scss
│   │   │   │   └── login-form.tsx
│   │   │   └── login page navbar
│   │   │       ├── login-navbar.module.scss
│   │   │       └── login-navbar.tsx
│   │   ├── logs-page
│   │   │   └── logsform
│   │   │       ├── logsform.module.scss
│   │   │       └── logsform.tsx
│   │   ├── mini-loader
│   │   │   ├── mini-loader.module.scss
│   │   │   └── mini-loader.tsx
│   │   ├── navbar
│   │   │   ├── navbar.module.scss
│   │   │   └── navbar.tsx
│   │   ├── queryprovider
│   │   │   └── queryprovider.tsx
│   │   ├── signout-button
│   │   │   ├── signout-button.module.scss
│   │   │   └── signout-button.tsx
│   │   ├── Theme-Provider
│   │   │   └── theme-provider.tsx
│   │   ├── Theme-Switcher
│   │   │   └── theme-switcher.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       └── dropdown-menu.tsx
│   ├── context
│   │   └── formcontext.tsx
│   ├── customhooks
│   │   ├── alerthook
│   │   │   └── alerts.tsx
│   │   ├── stateloadhook
│   │   │   └── stateloadhook.tsx
│   │   └── unitloadhook
│   │       └── unitloadhook.tsx
│   ├── database                         -> consists of the database schema
│   │   ├── 0000_tidy_next_avengers.sql      and other related stuff to supabase
│   │   ├── connection
│   │   │   └── db_connection.ts
│   │   ├── meta
│   │   │   ├── 0000_snapshot.json
│   │   │   └── _journal.json
│   │   └── schema
│   │       └── driver.ts
│   ├── lib
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── styles                              -> consists of stylings
│   │   ├── account.scss
│   │   ├── alerts.scss
│   │   ├── dashboard.scss
│   │   ├── error.scss
│   │   ├── global.css
│   │   ├── loading.scss
│   │   ├── login.scss
│   │   ├── logs.scss
│   │   ├── logtable.scss
│   │   └── page.scss
│   └── utils                               -> consists of supbase related utilities
│       └── supabase
│           ├── client.tsx
│           ├── server.tsx
│           └── updatesession.tsx
├── styles.d.ts
└── tsconfig.json
```


## Working Demo

This is video showing how the system works :

https://github.com/user-attachments/assets/b4dba206-2b68-4459-b6e6-6f296bcdc24d





