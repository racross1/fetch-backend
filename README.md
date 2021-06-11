# Fetch Backend Points Tracker

Welcome! In this app a user can earn points from different payer partners, and spend those points as they choose.

This repository includes a backend API with routes allowing a user to earn points from different payers, and spend those points in a first in first out order. 

This project also includes a frontend interface to show a summary output of a user's transactions. 

To use this project you will need the latest version of Ruby and Rails as well as PostrGreSQL and a Javascript package manager (these instructions assume npm as the user's package manager).


# Built With
- Ruby on Rails
- PostGreSQL
- React JS


# Installation
To install fork, clone, and navigate into this repository. 

This app includes a backend and a frontend and so separate instructions are included for the installation of each.

## Backend Installation
Navigate into the fetch-backend folder and then enter the following commands (in the order listed) in your terminal:

    bundle install
    rails db:create
    rails db:migrate
    rails db:seed

The above will generate the database for your backend and will seed it with example data. 

## Frontend Installation
Navigate into the fetch-frontend folder and then enter the following command in your terminal:

    npm install


# Starting the App

## Starting Backend
To start the backend server make sure you are in the fetch-backend folder in your terminal and enter the following command in your terminal: 

    rails s

## Starting Frontend
To start the frontend make sure you are in the fetch-frontend folder in your terminal and enter the following command:

    npm start


# How to Use

## Logging In
Once you have launched your backend server and frontend interface, you will see a login page in your browser. This page is not password protected or authenticated, and is just used to specify which user is accessing the app (and by extension, which user new points should be associated with).

The example data with which the database is seeded includes an example user with the username "test_user", which you can use when running the app. 

To access the app with the seeded test user data, enter test_user into the username field and then click the login button. 

You can also create a new username if you prefer. To log back in as this user you will need to enter the username exactly as you first entered it (field is case sensitive).

## Using the App

The main page of the application is split into 2 halves: User Console and Admin Console. 

### User Console
**Earning Points**

On the lefthand side of the user console you can create a new points transaction to earn points from the payer partner of your choosing. 

To create a new transaction, select the payer name and amount from the dropdown lists provided, and select the timestamp that you want to be associated with your new transaction. If you do not specify a timestamp the default timestamp will be used.

**Seeing User Points Balance**

In the center of the user console you will see the current user's point balance. This balance will increase and decrease as you earn and spend points

**Spending Points**

On the righthand side of the user console you can create a new spend transaction to spend the user's available points. 

This field does not specify a payer partner. The spend output can be seen in the Admin console in the lower righthand corner of the screen.

### Admin Console

**Seeing Payer Points Balance**

On the lefthand side of the admin console you will see a list of all the payers with which the current user has points, along with the number of points the user has with each payer.

These points will increase and decrese as you earn and spend points.

**Seeing Earned Points Available to Spend**

In the center of the admin console is a list of all earned points that have not yet been spent, along with the timestamps associated with those points. 

With each earn transaction entry you will see the payer name, initial amount (initial amount of the earn transaction), points remaining (initial amount of the earn transaction less any points spent) and transaction timestamp. 

As the user spends and earns points, earn transactions will be added to and removed from this list.

**Seeing new Spend Transaction**

On the righthand side of the admin console you can see the spend output for any new spend transactions you make.

This output is not persisted to the backend, and so is only shown when a new spend transaction is run. 

The spend output will show the timestamps, payers and amounts comprising each spend transaction.  
